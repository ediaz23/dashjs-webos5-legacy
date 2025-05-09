/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

import CommonEncryption from '../CommonEncryption.js';
import MediaCapability from '../vo/MediaCapability.js';
import KeySystemConfiguration from '../vo/KeySystemConfiguration.js';
import ProtectionErrors from '../errors/ProtectionErrors.js';
import DashJSError from '../../vo/DashJSError.js';
import LicenseRequest from '../vo/LicenseRequest.js';
import LicenseResponse from '../vo/LicenseResponse.js';
import {HTTPRequest} from '../../vo/metrics/HTTPRequest.js';
import Utils from '../../../core/Utils.js';
import Constants from '../../constants/Constants.js';
import FactoryMaker from '../../../core/FactoryMaker.js';
import ProtectionConstants from '../../constants/ProtectionConstants.js';

const NEEDKEY_BEFORE_INITIALIZE_RETRIES = 5;
const NEEDKEY_BEFORE_INITIALIZE_TIMEOUT = 500;

const LICENSE_SERVER_REQUEST_RETRIES = 3;
const LICENSE_SERVER_REQUEST_RETRY_INTERVAL = 1000;
const LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT = 8000;

/**
 * @module ProtectionController
 * @description Provides access to media protection information and functionality.  Each
 * ProtectionController manages a single {@link MediaPlayer.models.ProtectionModel}
 * which encapsulates a set of protection information (EME APIs, selected key system,
 * key sessions).  The APIs of ProtectionController mostly align with the latest EME
 * APIs.  Key system selection is mostly automated when combined with app-overrideable
 * functionality provided in {@link ProtectionKeyController}.
 * @todo ProtectionController does almost all of its tasks automatically after init() is
 * called.  Applications might want more control over this process and want to go through
 * each step manually (key system selection, session creation, session maintenance).
 * This module can be accessed using the MediaPlayer API getProtectionController()
 * @param {Object} config
 */

function ProtectionController(config) {

    config = config || {};
    const BASE64 = config.BASE64;
    const cmcdModel = config.cmcdModel;
    const constants = config.constants;
    const customParametersModel = config.customParametersModel;
    const debug = config.debug;
    const eventBus = config.eventBus;
    const events = config.events;
    const protectionKeyController = config.protectionKeyController;
    const settings = config.settings;
    let protectionModel = config.protectionModel;
    let needkeyRetries = [];

    let applicationProvidedProtectionData,
        instance,
        keyStatusMap,
        keySystemSelectionInProgress,
        licenseRequestRetryTimeout,
        licenseXhrRequest,
        logger,
        mediaInfoArr,
        pendingMediaTypesToHandle,
        robustnessLevel,
        selectedKeySystem,
        sessionType;

    function setup() {
        logger = debug.getLogger(instance);
        pendingMediaTypesToHandle = [];
        mediaInfoArr = [];
        sessionType = 'temporary';
        robustnessLevel = '';
        licenseXhrRequest = null;
        licenseRequestRetryTimeout = null;
        keyStatusMap = new Map();
        eventBus.on(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);
    }

    function _checkConfig() {
        if (!eventBus || !eventBus.hasOwnProperty('on') || !protectionKeyController || !protectionKeyController.hasOwnProperty('getSupportedKeySystemMetadataFromContentProtection')) {
            throw new Error('Missing config parameter(s)');
        }
    }

    /**
     * Initialize this protection system for a given media type.
     *
     * @param {StreamInfo} [mediaInfo] Media information
     * @memberof module:ProtectionController
     * @instance
     */
    function initializeForMedia(mediaInfo) {
        // Not checking here if a session for similar KS/KID combination is already created
        // because still don't know which keysystem will be selected.
        // Once Keysystem is selected and before creating the session, we will do that check
        // so we create the strictly necessary DRM sessions
        if (!mediaInfo) {
            throw new Error('mediaInfo can not be null or undefined');
        }

        _checkConfig();
        mediaInfoArr.push(mediaInfo);
    }

    /**
     * Once all mediaInfo objects have been added to our mediaInfoArray we can select a key system or check if the kid has changed and we need to trigger a new license request
     * @memberof module:ProtectionController
     * @instance
     */
    function handleKeySystemFromManifest() {
        if (!mediaInfoArr || mediaInfoArr.length === 0) {
            return;
        }

        let supportedKeySystemsMetadata = [];
        mediaInfoArr.forEach((mediaInfo) => {
            const keySystemsMetadata = protectionKeyController.getSupportedKeySystemMetadataFromContentProtection(mediaInfo.contentProtection, applicationProvidedProtectionData, sessionType);
            // We assume that the same key systems are signaled for each AS. We can use the first entry we find
            if (keySystemsMetadata.length > 0) {
                if (supportedKeySystemsMetadata.length === 0) {
                    supportedKeySystemsMetadata = keySystemsMetadata;
                }
                // Save config for creating key session once we selected a key system
                pendingMediaTypesToHandle.push(keySystemsMetadata);
            }
        })

        if (supportedKeySystemsMetadata && supportedKeySystemsMetadata.length > 0) {
            _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, true);
        }
    }

    /**
     * Selects a key system if we dont have any one yet. Otherwise we use the existing key system and trigger a new license request if the initdata has changed
     * @param {array} supportedKeySystemsMetadata
     * @private
     */
    function _handleKeySystemFromPssh(supportedKeySystemsMetadata) {
        pendingMediaTypesToHandle.push(supportedKeySystemsMetadata);
        _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, false);
    }

    /**
     * Select the key system or update one of our existing key sessions
     * @param {array} supportedKeySystemsMetadata
     * @param {boolean} fromManifest
     * @private
     */
    function _selectKeySystemOrUpdateKeySessions(supportedKeySystemsMetadata, fromManifest) {
        // First time, so we need to select a key system
        if (!selectedKeySystem && !keySystemSelectionInProgress) {
            _selectInitialKeySystem(supportedKeySystemsMetadata, fromManifest);
        }

        // We already selected a key system. We only need to trigger a new license exchange if the init data has changed
        else if (selectedKeySystem) {
            _handlePendingMediaTypes();
        }
    }

    /**
     * We do not have a key system yet. Select one
     * @param {array} supportedKeySystemsMetadata
     * @param {boolean} fromManifest
     * @private
     */
    function _selectInitialKeySystem(supportedKeySystemsMetadata, fromManifest) {
        if (keySystemSelectionInProgress) {
            return
        }

        keySystemSelectionInProgress = true;

        // Reorder key systems according to priority order provided in protectionData
        supportedKeySystemsMetadata = _sortKeySystemsByPriority(supportedKeySystemsMetadata)

        // Add all key systems to our request list since we have yet to select a key system
        const keySystemConfigurationsToRequest = _getKeySystemConfigurations(supportedKeySystemsMetadata);

        let keySystemAccess;
        protectionModel.requestKeySystemAccess(keySystemConfigurationsToRequest)
            .then((event) => {
                keySystemAccess = event.data;
                return _onKeySystemAccessed(keySystemAccess);
            })
            .then((keySystem) => {
                _onMediaKeysCreated(keySystem, keySystemAccess);
            })
            .catch((event) => {
                _handleKeySystemSelectionError(event, fromManifest);
            })

    }

    function _onKeySystemAccessed(keySystemAccess) {
        let selectedSystemString = keySystemAccess && keySystemAccess.selectedSystemString ? keySystemAccess.selectedSystemString : keySystemAccess.keySystem.systemString;
        logger.info('DRM: KeySystem Access Granted for system string (' + selectedSystemString + ')!  Selecting key system...');
        return protectionModel.selectKeySystem(keySystemAccess);
    }

    function _onMediaKeysCreated(keySystem, keySystemAccess) {
        selectedKeySystem = keySystem;
        keySystemSelectionInProgress = false;

        eventBus.trigger(events.KEY_SYSTEM_SELECTED, { data: keySystemAccess });

        // Set server certificate from protData
        const protData = _getProtDataForKeySystem(selectedKeySystem);
        if (protData && protData.serverCertificate && protData.serverCertificate.length > 0) {
            protectionModel.setServerCertificate(BASE64.decodeArray(protData.serverCertificate).buffer);
        }

        _handlePendingMediaTypes();
    }

    /**
     * If we have already selected a key system we only need to create a new key session and issue a new license request if the init data has changed.
     * @private
     */
    function _handlePendingMediaTypes() {
        // Create key sessions for the different AdaptationSets
        let ksIdx;
        for (let i = 0; i < pendingMediaTypesToHandle.length; i++) {
            for (ksIdx = 0; ksIdx < pendingMediaTypesToHandle[i].length; ksIdx++) {
                if (selectedKeySystem === pendingMediaTypesToHandle[i][ksIdx].ks) {
                    const keySystemMetadata = pendingMediaTypesToHandle[i][ksIdx]
                    _loadOrCreateKeySession(keySystemMetadata)
                    break;
                }
            }
        }
        pendingMediaTypesToHandle = [];
    }

    function _handleKeySystemSelectionError(event, fromManifest) {
        selectedKeySystem = null;
        keySystemSelectionInProgress = false;
        if (!fromManifest) {
            eventBus.trigger(events.KEY_SYSTEM_SELECTED, {
                data: null,
                error: new DashJSError(ProtectionErrors.KEY_SYSTEM_ACCESS_DENIED_ERROR_CODE, ProtectionErrors.KEY_SYSTEM_ACCESS_DENIED_ERROR_MESSAGE + 'Error selecting key system! -- ' + event.error)
            });
        }
    }

    function _sortKeySystemsByPriority(supportedKeySystems) {
        return supportedKeySystems.sort((ksA, ksB) => {
            let indexA = (applicationProvidedProtectionData && applicationProvidedProtectionData[ksA.ks.systemString] && applicationProvidedProtectionData[ksA.ks.systemString].priority >= 0) ? applicationProvidedProtectionData[ksA.ks.systemString].priority : supportedKeySystems.length;
            let indexB = (applicationProvidedProtectionData && applicationProvidedProtectionData[ksB.ks.systemString] && applicationProvidedProtectionData[ksB.ks.systemString].priority >= 0) ? applicationProvidedProtectionData[ksB.ks.systemString].priority : supportedKeySystems.length;
            return indexA - indexB;
        });
    }

    function _getKeySystemConfigurations(supportedKeySystemsMetadata) {
        const keySystemConfigurationsToRequest = [];
        for (let i = 0; i < supportedKeySystemsMetadata.length; i++) {
            const keySystemConfiguration = _getKeySystemConfiguration(supportedKeySystemsMetadata[i]);
            keySystemConfigurationsToRequest.push({
                ks: supportedKeySystemsMetadata[i].ks,
                configs: [keySystemConfiguration],
                protData: supportedKeySystemsMetadata[i].protData
            });
        }

        return keySystemConfigurationsToRequest;
    }

    /**
     * Returns an object corresponding to the EME MediaKeySystemConfiguration dictionary
     * @param {object} keySystem
     * @return {KeySystemConfiguration}
     * @private
     */
    function _getKeySystemConfiguration(keySystemData) {
        const protData = keySystemData.protData;
        const audioCapabilities = [];
        const videoCapabilities = [];
        const initDataTypes = (protData && protData.initDataTypes && protData.initDataTypes.length > 0) ? protData.initDataTypes : [ProtectionConstants.INITIALIZATION_DATA_TYPE_CENC];
        const audioRobustness = (protData && protData.audioRobustness && protData.audioRobustness.length > 0) ? protData.audioRobustness : robustnessLevel;
        const videoRobustness = (protData && protData.videoRobustness && protData.videoRobustness.length > 0) ? protData.videoRobustness : robustnessLevel;
        const ksSessionType = keySystemData.sessionType;
        const distinctiveIdentifier = (protData && protData.distinctiveIdentifier) ? protData.distinctiveIdentifier : 'optional';
        const persistentState = (protData && protData.persistentState) ? protData.persistentState : (ksSessionType === 'temporary') ? 'optional' : 'required';

        mediaInfoArr.forEach((media) => {
            if (media.type === constants.AUDIO) {
                audioCapabilities.push(new MediaCapability(media.codec, audioRobustness));
            } else if (media.type === constants.VIDEO) {
                videoCapabilities.push(new MediaCapability(media.codec, videoRobustness));
            }
        });

        return new KeySystemConfiguration(audioCapabilities, videoCapabilities, distinctiveIdentifier, persistentState, [ksSessionType], initDataTypes);
    }

    /**
     * Loads an existing key session if we already have a session id. Otherwise we create a new key session
     * @param {object} keySystemMetadata
     * @private
     */
    function _loadOrCreateKeySession(keySystemMetadata) {
        if (protectionKeyController.isClearKey(selectedKeySystem)) {
            _handleClearkeySession(keySystemMetadata)
        }

        // Reuse existing KeySession
        if (keySystemMetadata.sessionId) {
            // Load MediaKeySession with sessionId
            loadKeySession(keySystemMetadata);
        }

        // Create a new KeySession
        else if (keySystemMetadata.initData !== null) {
            // Create new MediaKeySession with initData
            createKeySession(keySystemMetadata);
        }
    }

    function _handleClearkeySession(keySystemMetadata) {
        // For Clearkey: if parameters for generating init data was provided by the user, use them for generating
        // initData and overwrite possible initData indicated in encrypted event (EME)
        if (keySystemMetadata.protData && keySystemMetadata.protData.hasOwnProperty('clearkeys') && Object.keys(keySystemMetadata.protData.clearkeys).length !== 0) {
            const initData = { kids: Object.keys(keySystemMetadata.protData.clearkeys) };
            keySystemMetadata.initData = new TextEncoder().encode(JSON.stringify(initData));
        }
    }

    /**
     * Loads a key session with the given session ID from persistent storage.  This essentially creates a new key session
     *
     * @param {object} ksInfo
     * @memberof module:ProtectionController
     * @instance
     * @fires ProtectionController#KeySessionCreated
     * @ignore
     */
    function loadKeySession(keySystemMetadata) {
        _checkConfig();
        protectionModel.loadKeySession(keySystemMetadata);
    }

    /**
     * Create a new key session associated with the given initialization data from the MPD or from the PSSH box in the media
     * For the latest version of the EME a request is generated. Once this request is ready we get notified via the INTERNAL_KEY_MESSAGE event
     * @param {ArrayBuffer} initData the initialization data
     * @param {Uint8Array} cdmData the custom data to provide to licenser
     * @memberof module:ProtectionController
     * @instance
     * @fires ProtectionController#KeySessionCreated
     * @ignore
     */
    function createKeySession(keySystemMetadata) {

        // Check for duplicate key id
        if (keySystemMetadata && _doesSessionForKeyIdExists(keySystemMetadata.keyId)) {
            return;
        }

        const initDataForKS = CommonEncryption.getPSSHForKeySystem(selectedKeySystem, keySystemMetadata ? keySystemMetadata.initData : null);
        if (initDataForKS) {

            // Check for duplicate initData
            if (_isInitDataDuplicate(initDataForKS)) {
                return;
            }

            try {
                keySystemMetadata.initData = initDataForKS;
                protectionModel.createKeySession(keySystemMetadata);
            } catch (error) {
                eventBus.trigger(events.KEY_SESSION_CREATED, {
                    data: null,
                    error: new DashJSError(ProtectionErrors.KEY_SESSION_CREATED_ERROR_CODE, ProtectionErrors.KEY_SESSION_CREATED_ERROR_MESSAGE + error.message)
                });
            }
        } else if (keySystemMetadata && keySystemMetadata.initData) {
            protectionModel.createKeySession(keySystemMetadata);
        } else {
            eventBus.trigger(events.KEY_SESSION_CREATED, {
                data: null,
                error: new DashJSError(ProtectionErrors.KEY_SESSION_CREATED_ERROR_CODE, ProtectionErrors.KEY_SESSION_CREATED_ERROR_MESSAGE + 'Selected key system is ' + (selectedKeySystem ? selectedKeySystem.systemString : null) + '.  needkey/encrypted event contains no initData corresponding to that key system!')
            });
        }
    }

    /**
     * Returns the protectionData for a specific keysystem as specified by the application.
     * @param {object} keySystem
     * @return {object | null}
     * @private
     */
    function _getProtDataForKeySystem(keySystem) {
        if (keySystem) {
            const keySystemString = keySystem.systemString;

            if (applicationProvidedProtectionData) {
                return (keySystemString in applicationProvidedProtectionData) ? applicationProvidedProtectionData[keySystemString] : null;
            }
        }
        return null;
    }

    /**
     * Removes all entries from the mediaInfoArr
     */
    function clearMediaInfoArray() {
        mediaInfoArr = [];
    }

    /**
     * Returns a set of supported key systems and CENC initialization data
     * from the given array of ContentProtection elements.  Only
     * key systems that are supported by this player will be returned.
     * Key systems are returned in priority order (highest first).
     *
     * @param {Array.<Object>} cps - array of content protection elements parsed
     * from the manifest
     * @returns {Array.<Object>} array of objects indicating which supported key
     * systems were found.  Empty array is returned if no
     * supported key systems were found
     * @memberof module:ProtectionKeyController
     * @instance
     * @ignore
     */
    function getSupportedKeySystemMetadataFromContentProtection(cps) {
        _checkConfig();
        return protectionKeyController.getSupportedKeySystemMetadataFromContentProtection(cps, applicationProvidedProtectionData, sessionType);
    }

    /**
     * Checks if a session has already created for the provided key id
     * @param {string} keyId
     * @return {boolean}
     * @private
     */
    function _doesSessionForKeyIdExists(keyId) {
        if (!keyId) {
            return false;
        }

        try {
            const sessions = protectionModel.getSessionTokens();
            for (let i = 0; i < sessions.length; i++) {
                if (sessions[i].getKeyId() === keyId) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    /**
     * Checks if the provided init data is equal to one of the existing init data values
     * @param {any} initDataForKS
     * @return {boolean}
     * @private
     */
    function _isInitDataDuplicate(initDataForKS) {

        if (!initDataForKS) {
            return false;
        }

        try {
            const currentInitData = protectionModel.getAllInitData();
            for (let i = 0; i < currentInitData.length; i++) {
                if (protectionKeyController.initDataEquals(initDataForKS, currentInitData[i])) {
                    logger.debug('DRM: Ignoring initData because we have already seen it!');
                    return true;
                }
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    /**
     * Removes the given key session from persistent storage and closes the session
     * as if {@link ProtectionController#closeKeySession}
     * was called
     *
     * @param {SessionToken} sessionToken the session
     * token
     * @memberof module:ProtectionController
     * @instance
     * @fires ProtectionController#KeySessionRemoved
     * @fires ProtectionController#KeySessionClosed
     * @ignore
     */
    function removeKeySession(sessionToken) {
        _checkConfig();
        protectionModel.removeKeySession(sessionToken);
    }

    /**
     * Closes the key session and releases all associated decryption keys.  These
     * keys will no longer be available for decrypting media
     *
     * @param {SessionToken} sessionToken the session
     * token
     * @memberof module:ProtectionController
     * @instance
     * @fires ProtectionController#KeySessionClosed
     * @ignore
     */
    function closeKeySession(sessionToken) {
        _checkConfig();
        protectionModel.closeKeySession(sessionToken);
    }

    /**
     * Sets a server certificate for use by the CDM when signing key messages
     * intended for a particular license server.  This will fire
     * an error event if a key system has not yet been selected.
     *
     * @param {ArrayBuffer} serverCertificate a CDM-specific license server
     * certificate
     * @memberof module:ProtectionController
     * @instance
     * @fires ProtectionController#ServerCertificateUpdated
     */
    function setServerCertificate(serverCertificate) {
        _checkConfig();
        protectionModel.setServerCertificate(serverCertificate);
    }

    /**
     * Associate this protection system with the given HTMLMediaElement.  This
     * causes the system to register for needkey/encrypted events from the given
     * element and provides a destination for setting of MediaKeys
     *
     * @param {HTMLMediaElement} element the media element to which the protection
     * system should be associated
     * @memberof module:ProtectionController
     * @instance
     */
    function setMediaElement(element) {
        _checkConfig();
        if (element) {
            protectionModel.setMediaElement(element);
            eventBus.on(events.NEED_KEY, _onNeedKey, instance);
        } else if (element === null) {
            protectionModel.setMediaElement(element);
            eventBus.off(events.NEED_KEY, _onNeedKey, instance);
        }
    }

    /**
     * Sets the session type to use when creating key sessions.  Either "temporary" or
     * "persistent-license".  Default is "temporary".
     *
     * @param {string} value the session type
     * @memberof module:ProtectionController
     * @instance
     */
    function setSessionType(value) {
        sessionType = value;
    }

    /**
     * Sets the robustness level for video and audio capabilities. Optional to remove Chrome warnings.
     * Possible values are SW_SECURE_CRYPTO, SW_SECURE_DECODE, HW_SECURE_CRYPTO, HW_SECURE_CRYPTO, HW_SECURE_DECODE, HW_SECURE_ALL.
     *
     * @param {string} level the robustness level
     * @memberof module:ProtectionController
     * @instance
     */
    function setRobustnessLevel(level) {
        robustnessLevel = level;
    }

    /**
     * Attach KeySystem-specific data to use for license acquisition with EME
     *
     * @param {Object} data an object containing property names corresponding to
     * key system name strings (e.g. "org.w3.clearkey") and associated values
     * being instances of {@link ProtectionData}
     * @memberof module:ProtectionController
     * @instance
     * @ignore
     */
    function setProtectionData(data) {
        applicationProvidedProtectionData = data;
        protectionKeyController.setProtectionData(data);
    }

    /**
     * Stop method is called when current playback is stopped/resetted.
     *
     * @memberof module:ProtectionController
     * @instance
     */
    function stop() {
        _abortLicenseRequest();
        if (protectionModel) {
            protectionModel.stop();
        }
    }

    /**
     * Destroys all protection data associated with this protection set.  This includes
     * deleting all key sessions. In the case of persistent key sessions, the sessions
     * will simply be unloaded and not deleted.  Additionally, if this protection set is
     * associated with a HTMLMediaElement, it will be detached from that element.
     *
     * @memberof module:ProtectionController
     * @instance
     * @ignore
     */
    function reset() {
        eventBus.off(events.INTERNAL_KEY_MESSAGE, _onKeyMessage, instance);

        _checkConfig();

        _abortLicenseRequest();

        setMediaElement(null);

        selectedKeySystem = null;
        keySystemSelectionInProgress = false;

        keyStatusMap = new Map();

        if (protectionModel) {
            protectionModel.reset();
            protectionModel = null;
        }

        needkeyRetries.forEach(retryTimeout => clearTimeout(retryTimeout));
        needkeyRetries = [];

        mediaInfoArr = [];
        pendingMediaTypesToHandle = [];
    }

    /**
     * Event handler for the key message event. Once we have a key message we can issue a license request
     * @param {object} e
     * @private
     */
    function _onKeyMessage(e) {
        logger.debug('DRM: onKeyMessage');

        // Dispatch event to applications indicating we received a key message
        const keyMessage = e.data;
        eventBus.trigger(events.KEY_MESSAGE, { data: keyMessage });
        const messageType = (keyMessage.messageType) ? keyMessage.messageType : ProtectionConstants.MEDIA_KEY_MESSAGE_TYPES.LICENSE_REQUEST;
        const message = keyMessage.message;
        const sessionToken = keyMessage.sessionToken;
        const protData = _getProtDataForKeySystem(selectedKeySystem);
        const licenseServerModelInstance = protectionKeyController.getLicenseServerModelInstance(selectedKeySystem, protData, messageType);
        const eventData = { sessionToken: sessionToken, messageType: messageType };

        // Ensure message from CDM is not empty
        if (!message || message.byteLength === 0) {
            _sendLicenseRequestCompleteEvent(eventData, new DashJSError(ProtectionErrors.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_CODE, ProtectionErrors.MEDIA_KEY_MESSAGE_NO_CHALLENGE_ERROR_MESSAGE));
            return;
        }

        // Message not destined for license server
        if (!licenseServerModelInstance) {
            logger.debug('DRM: License server request not required for this message (type = ' + e.data.messageType + ').  Session ID = ' + sessionToken.getSessionId());
            _sendLicenseRequestCompleteEvent(eventData);
            return;
        }

        // Perform any special handling for ClearKey
        if (protectionKeyController.isClearKey(selectedKeySystem)) {
            const clearkeys = protectionKeyController.processClearKeyLicenseRequest(selectedKeySystem, protData, message);
            if (clearkeys && clearkeys.keyPairs && clearkeys.keyPairs.length > 0) {
                logger.debug('DRM: ClearKey license request handled by application!');
                _sendLicenseRequestCompleteEvent(eventData);
                protectionModel.updateKeySession(sessionToken, clearkeys);
                return;
            }
        }

        // In all other cases we have to make a license request
        _issueLicenseRequest(keyMessage, licenseServerModelInstance, protData);
    }

    /**
     * Notify other classes that the license request was completed
     * @param {object} data
     * @param {object} error
     * @private
     */
    function _sendLicenseRequestCompleteEvent(data, error = null) {
        eventBus.trigger(events.LICENSE_REQUEST_COMPLETE, { data: data, error: error });
    }

    /**
     * Start issuing a license request
     * @param {object} keyMessage
     * @param {object} licenseServerData
     * @param {object} protData
     * @private
     */
    function _issueLicenseRequest(keyMessage, licenseServerData, protData) {
        const sessionToken = keyMessage.sessionToken;
        const messageType = (keyMessage.messageType) ? keyMessage.messageType : ProtectionConstants.MEDIA_KEY_MESSAGE_TYPES.LICENSE_REQUEST;
        const eventData = { sessionToken: sessionToken, messageType: messageType };
        const keySystemString = selectedKeySystem ? selectedKeySystem.systemString : null;

        // Determine license server URL
        let url = _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData);

        // Ensure valid license server URL
        if (!url) {
            _sendLicenseRequestCompleteEvent(eventData, new DashJSError(ProtectionErrors.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_CODE, ProtectionErrors.MEDIA_KEY_MESSAGE_NO_LICENSE_SERVER_URL_ERROR_MESSAGE));
            return;
        }

        // Set optional XMLHttpRequest headers from protection data and message
        const reqHeaders = {};
        let withCredentials = false;
        if (protData) {
            _updateHeaders(reqHeaders, protData.httpRequestHeaders);
        }
        const message = keyMessage.message;
        const headersFromMessage = selectedKeySystem.getRequestHeadersFromMessage(message);
        _updateHeaders(reqHeaders, headersFromMessage);

        Object.keys(reqHeaders).forEach((key) => {
            if ('authorization' === key.toLowerCase()) {
                withCredentials = true;
            }
        });

        // Overwrite withCredentials property from protData if present
        if (protData && typeof protData.withCredentials == 'boolean') {
            withCredentials = protData.withCredentials;
        }

        const onLoad = function (xhr) {
            if (!protectionModel) {
                return;
            }

            if (xhr.status >= 200 && xhr.status <= 299) {
                const responseHeaders = Utils.parseHttpHeaders(xhr.getAllResponseHeaders ? xhr.getAllResponseHeaders() : null);
                let licenseResponse = new LicenseResponse(xhr.responseURL, responseHeaders, xhr.response);
                const licenseResponseFilters = customParametersModel.getLicenseResponseFilters();
                _applyFilters(licenseResponseFilters, licenseResponse)
                    .then(() => {
                        const licenseMessage = licenseServerData.getLicenseMessage(licenseResponse.data, keySystemString, messageType);
                        if (licenseMessage !== null) {
                            _sendLicenseRequestCompleteEvent(eventData);
                            protectionModel.updateKeySession(sessionToken, licenseMessage);
                        } else {
                            _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
                        }
                    });
            } else {
                _reportError(xhr, eventData, keySystemString, messageType, licenseServerData);
            }
        };

        const onAbort = function (xhr) {
            _sendLicenseRequestCompleteEvent(eventData, new DashJSError(ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE,
                ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR aborted. status is "' +
                xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
        };

        const onError = function (xhr) {
            _sendLicenseRequestCompleteEvent(eventData, new DashJSError(ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE,
                ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR error. status is "' +
                xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState));
        };

        const reqPayload = selectedKeySystem.getLicenseRequestFromMessage(message);
        const reqMethod = licenseServerData.getHTTPMethod(messageType);
        const responseType = licenseServerData.getResponseType(keySystemString, messageType);
        const timeout = protData && !isNaN(protData.httpTimeout) ? protData.httpTimeout : LICENSE_SERVER_REQUEST_DEFAULT_TIMEOUT;
        const sessionId = sessionToken.getSessionId() || null;

        let licenseRequest = new LicenseRequest(url, reqMethod, responseType, reqHeaders, withCredentials, messageType, sessionId, reqPayload);
        const retryAttempts = !isNaN(settings.get().streaming.retryAttempts[HTTPRequest.LICENSE]) ? settings.get().streaming.retryAttempts[HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRIES;
        const licenseRequestFilters = customParametersModel.getLicenseRequestFilters();
        _applyFilters(licenseRequestFilters, licenseRequest)
            .then(() => {
                _doLicenseRequest(licenseRequest, retryAttempts, timeout, onLoad, onAbort, onError);
            });
    }

    /**
     * Implement license requests with a retry mechanism to avoid temporary network issues to affect playback experience
     * @param {object} request
     * @param {number} retriesCount
     * @param {number} timeout
     * @param {function} onLoad
     * @param {function} onAbort
     * @param {function} onError
     * @private
     */
    function _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError) {
        const xhr = new XMLHttpRequest();
        const cmcdParameters = cmcdModel.getCmcdParametersFromManifest();

        if (cmcdModel.isCmcdEnabled()) {
            const cmcdMode = cmcdParameters.mode ? cmcdParameters.mode : settings.get().streaming.cmcd.mode;
            if (cmcdMode === Constants.CMCD_MODE_QUERY) {
                const cmcdParams = cmcdModel.getQueryParameter({
                    url: request.url,
                    type: HTTPRequest.LICENSE
                });

                if (cmcdParams) {
                    request.url = Utils.addAdditionalQueryParameterToUrl(request.url, [cmcdParams]);
                }
            }
        }

        xhr.open(request.method, request.url, true);
        xhr.responseType = request.responseType;
        xhr.withCredentials = request.withCredentials;
        if (timeout > 0) {
            xhr.timeout = timeout;
        }
        for (const key in request.headers) {
            xhr.setRequestHeader(key, request.headers[key]);
        }

        if (cmcdModel.isCmcdEnabled()) {
            const cmcdMode = cmcdParameters.mode ? cmcdParameters.mode : settings.get().streaming.cmcd.mode;
            if (cmcdMode === Constants.CMCD_MODE_HEADER) {
                const cmcdHeaders = cmcdModel.getHeaderParameters({
                    url: request.url,
                    type: HTTPRequest.LICENSE
                });

                if (cmcdHeaders) {
                    for (const header in cmcdHeaders) {
                        let value = cmcdHeaders[header];
                        if (value) {
                            xhr.setRequestHeader(header, value);
                        }
                    }
                }
            }
        }

        const _retryRequest = function () {
            // fail silently and retry
            retriesCount--;
            const retryInterval = !isNaN(settings.get().streaming.retryIntervals[HTTPRequest.LICENSE]) ? settings.get().streaming.retryIntervals[HTTPRequest.LICENSE] : LICENSE_SERVER_REQUEST_RETRY_INTERVAL;
            licenseRequestRetryTimeout = setTimeout(function () {
                _doLicenseRequest(request, retriesCount, timeout, onLoad, onAbort, onError);
            }, retryInterval);
        };

        xhr.onload = function () {
            licenseXhrRequest = null;
            if (this.status >= 200 && this.status <= 299 || retriesCount <= 0) {
                onLoad(this);
            } else {
                logger.warn('License request failed (' + this.status + '). Retrying it... Pending retries: ' + retriesCount);
                _retryRequest();
            }
        };

        xhr.ontimeout = xhr.onerror = function () {
            licenseXhrRequest = null;
            if (retriesCount <= 0) {
                onError(this);
            } else {
                logger.warn('License request network request failed . Retrying it... Pending retries: ' + retriesCount);
                _retryRequest();
            }
        };

        xhr.onabort = function () {
            onAbort(this);
        };

        // deprecated, to be removed
        eventBus.trigger(events.LICENSE_REQUEST_SENDING, {
            url: request.url,
            headers: request.headers,
            payload: request.data,
            sessionId: request.sessionId
        });

        licenseXhrRequest = xhr;
        xhr.send(request.data);
    }

    /**
     * Aborts license request
     * @private
     */
    function _abortLicenseRequest() {
        if (licenseXhrRequest) {
            licenseXhrRequest.onloadend = licenseXhrRequest.onerror = licenseXhrRequest.onprogress = undefined; //Ignore events from aborted requests.
            licenseXhrRequest.abort();
            licenseXhrRequest = null;
        }

        if (licenseRequestRetryTimeout) {
            clearTimeout(licenseRequestRetryTimeout);
            licenseRequestRetryTimeout = null;
        }
    }

    /**
     * Returns the url of the license server
     * @param {object} protData
     * @param {string} messageType
     * @param {object} sessionToken
     * @param {object} keyMessage
     * @param {object} licenseServerData
     * @return {*}
     * @private
     */
    function _getLicenseServerUrl(protData, messageType, sessionToken, keyMessage, licenseServerData) {
        let url = null;
        const message = keyMessage.message;

        // Check if the url is defined by the application
        if (protData && protData.serverURL) {
            const serverURL = protData.serverURL;
            if (typeof serverURL === 'string' && serverURL !== '') {
                url = serverURL;
            } else if (typeof serverURL === 'object' && serverURL.hasOwnProperty(messageType)) {
                url = serverURL[messageType];
            }
        }

        // This is the old way of providing the url
        else if (protData && protData.laURL && protData.laURL !== '') {
            url = protData.laURL;
        }

        // No url provided by the app. Check the manifest and the pssh
        else {
            // Check for url defined in the manifest
            url = CommonEncryption.getLicenseServerUrlFromMediaInfo(mediaInfoArr, selectedKeySystem.schemeIdURI);

            // In case we are not using Clearky we can still get a url from the pssh.
            if (!url && !protectionKeyController.isClearKey(selectedKeySystem)) {
                const psshData = CommonEncryption.getPSSHData(sessionToken.initData);
                url = selectedKeySystem.getLicenseServerURLFromInitData(psshData);

                // Still no url, check the keymessage
                if (!url) {
                    url = keyMessage.laURL;
                }
            }
        }
        // Possibly update or override the URL based on the message
        url = licenseServerData.getServerURLFromMessage(url, message, messageType);

        return url;
    }

    /**
     * Add new headers to the existing ones
     * @param {array} reqHeaders
     * @param {object} headers
     * @private
     */
    function _updateHeaders(reqHeaders, headers) {
        if (headers) {
            for (const key in headers) {
                reqHeaders[key] = headers[key];
            }
        }
    }

    /**
     * Reports an error that might have occured during the license request
     * @param {object} xhr
     * @param {object} eventData
     * @param {string} keySystemString
     * @param {string} messageType
     * @param {object} licenseServerData
     * @private
     */
    function _reportError(xhr, eventData, keySystemString, messageType, licenseServerData) {
        let errorMsg = 'NONE';
        let data = null;

        if (xhr.response) {
            errorMsg = licenseServerData.getErrorResponse(xhr.response, keySystemString, messageType);
            data = {
                serverResponse: xhr.response || null,
                responseCode: xhr.status || null,
                responseText: xhr.statusText || null
            }
        }

        _sendLicenseRequestCompleteEvent(eventData, new DashJSError(ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_CODE,
            ProtectionErrors.MEDIA_KEY_MESSAGE_LICENSER_ERROR_MESSAGE + keySystemString + ' update, XHR complete. status is "' +
            xhr.statusText + '" (' + xhr.status + '), readyState is ' + xhr.readyState + '.  Response is ' + errorMsg,
            data
        ));
    }

    /**
     * Applies custom filters defined by the application
     * @param {array} filters
     * @param {object} param
     * @return {Promise<void>|*}
     * @private
     */
    function _applyFilters(filters, param) {
        if (!filters) {
            return Promise.resolve();
        }
        return filters.reduce((prev, next) => {
            return prev.then(() => {
                return next(param);
            });
        }, Promise.resolve());
    }

    /**
     * Event handler for "needkey" and "encrypted" events
     * @param {object} event
     * @param {number} retry
     * @private
     */
    function _onNeedKey(event, retry) {
        if (settings.get().streaming.protection.ignoreEmeEncryptedEvent) {
            return
        }

        logger.debug('DRM: onNeedKey');

        // Ignore non-cenc initData
        if (event.key.initDataType !== ProtectionConstants.INITIALIZATION_DATA_TYPE_CENC) {
            logger.warn('DRM:  Only \'cenc\' initData is supported!  Ignoring initData of type: ' + event.key.initDataType);
            return;
        }

        if (mediaInfoArr.length === 0) {
            logger.warn('DRM: onNeedKey called before initializeForMedia, wait until initialized');
            retry = typeof retry === 'undefined' ? 1 : retry + 1;
            if (retry < NEEDKEY_BEFORE_INITIALIZE_RETRIES) {
                needkeyRetries.push(setTimeout(() => {
                    _onNeedKey(event, retry);
                }, NEEDKEY_BEFORE_INITIALIZE_TIMEOUT));
                return;
            }
        }

        // Some browsers return initData as Uint8Array (IE), some as ArrayBuffer (Chrome).
        // Convert to ArrayBuffer
        let abInitData = event.key.initData;
        if (ArrayBuffer.isView(abInitData)) {
            abInitData = abInitData.buffer;
        }

        // If key system has already been selected and initData already seen, then do nothing
        if (selectedKeySystem) {
            const initDataForKS = CommonEncryption.getPSSHForKeySystem(selectedKeySystem, abInitData);
            if (initDataForKS) {
                // Check for duplicate initData
                if (_isInitDataDuplicate(initDataForKS)) {
                    return;
                }
            }
        }

        logger.debug('DRM: initData:', String.fromCharCode.apply(null, new Uint8Array(abInitData)));

        const supportedKeySystemsMetadata = protectionKeyController.getSupportedKeySystemMetadataFromSegmentPssh(abInitData, applicationProvidedProtectionData, sessionType);
        if (supportedKeySystemsMetadata.length === 0) {
            logger.debug('DRM: Received needkey event with initData, but we don\'t support any of the key systems!');
            return;
        }

        _handleKeySystemFromPssh(supportedKeySystemsMetadata);
    }

    /**
     * Returns all available key systems
     * @return {array}
     */
    function getKeySystems() {
        return protectionKeyController ? protectionKeyController.getKeySystems() : [];
    }

    /**
     * Sets all available key systems
     * @param {array} keySystems
     */
    function setKeySystems(keySystems) {
        if (protectionKeyController) {
            protectionKeyController.setKeySystems(keySystems);
        }
    }

    function updateKeyStatusesMap(e) {
        try {
            if (!e || !e.sessionToken || !e.parsedKeyStatuses) {
                return
            }

            e.sessionToken.hasTriggeredKeyStatusMapUpdate = true;
            const parsedKeyStatuses = e.parsedKeyStatuses;
            const ua = Utils.parseUserAgent();
            const isEdgeBrowser = ua && ua.browser && ua.browser.name && ua.browser.name.toLowerCase() === 'edge';
            parsedKeyStatuses.forEach((keyStatus) => {
                if (isEdgeBrowser
                    && selectedKeySystem.uuid === ProtectionConstants.PLAYREADY_UUID
                    && keyStatus.keyId && keyStatus.keyId.byteLength === 16) {
                    _handlePlayreadyKeyId(keyStatus.keyId);
                }

                const keyIdInHex = Utils.bufferSourceToHex(keyStatus.keyId).slice(0, 32);
                if (keyIdInHex && keyIdInHex !== '') {
                    keyStatusMap.set(keyIdInHex, keyStatus.status);
                }
            })
            eventBus.trigger(events.KEY_STATUSES_MAP_UPDATED, { keyStatusMap });
        } catch (e) {
            logger.error(e);
        }
    }

    function _handlePlayreadyKeyId(keyId) {
        const dataView = Utils.bufferSourceToDataView(keyId);
        const part0 = dataView.getUint32(0, /* LE= */ true);
        const part1 = dataView.getUint16(4, /* LE= */ true);
        const part2 = dataView.getUint16(6, /* LE= */ true);
        // Write it back in big-endian:
        dataView.setUint32(0, part0, /* BE= */ false);
        dataView.setUint16(4, part1, /* BE= */ false);
        dataView.setUint16(6, part2, /* BE= */ false);
    }

    function areKeyIdsUsable(normalizedKeyIds) {
        try {
            if (!_shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap)) {
                return true;
            }

            return [...normalizedKeyIds].some((normalizedKeyId) => {
                const keyStatus = keyStatusMap.get(normalizedKeyId);
                return keyStatus && keyStatus !== ProtectionConstants.MEDIA_KEY_STATUSES.INTERNAL_ERROR && keyStatus !== ProtectionConstants.MEDIA_KEY_STATUSES.OUTPUT_RESTRICTED;
            });
        } catch (error) {
            logger.error(error);
            return true
        }
    }

    function areKeyIdsExpired(normalizedKeyIds) {
        try {
            if (!_shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap)) {
                return false;
            }

            return [...normalizedKeyIds].every((normalizedKeyId) => {
                const keyStatus = keyStatusMap.get(normalizedKeyId);
                return keyStatus === ProtectionConstants.MEDIA_KEY_STATUSES.EXPIRED;
            })
        } catch (error) {
            logger.error(error);
            return false
        }
    }

    function _shouldCheckKeyStatusMap(normalizedKeyIds, keyStatusMap) {
        if (normalizedKeyIds.size <= 0) {
            return false;
        }

        const allHaveStatus = keyStatusMap.size > 0 && [...normalizedKeyIds].every((normalizedKeyId) => {
            const keyStatus = keyStatusMap.get(normalizedKeyId);
            return typeof keyStatus !== 'undefined' && keyStatus !== '';
        });

        if (allHaveStatus) {
            return true
        }

        const sessionTokens = protectionModel.getSessionTokens();

        if (sessionTokens && sessionTokens.length > 0) {
            const targetSessionTokens = sessionTokens.filter((sessionToken) => {
                return [...normalizedKeyIds].includes(sessionToken.normalizedKeyId);
            })
            const hasNotTriggeredKeyStatusMapUpdate = targetSessionTokens.some((sessionToken) => {
                return !sessionToken.hasTriggeredKeyStatusMapUpdate;
            })
            if (hasNotTriggeredKeyStatusMapUpdate || targetSessionTokens.length === 0) {
                return false;
            }
        }
        return !settings.get().streaming.protection.ignoreKeyStatuses && normalizedKeyIds && normalizedKeyIds.size > 0 && keyStatusMap && keyStatusMap.size > 0
    }

    instance = {
        areKeyIdsExpired,
        areKeyIdsUsable,
        clearMediaInfoArray,
        closeKeySession,
        createKeySession,
        getKeySystems,
        getSupportedKeySystemMetadataFromContentProtection,
        handleKeySystemFromManifest,
        initializeForMedia,
        loadKeySession,
        removeKeySession,
        reset,
        setKeySystems,
        setMediaElement,
        setProtectionData,
        setRobustnessLevel,
        setServerCertificate,
        setSessionType,
        stop,
        updateKeyStatusesMap
    };

    setup();
    return instance;
}

ProtectionController.__dashjs_factory_name = 'ProtectionController';
export default FactoryMaker.getClassFactory(ProtectionController);
