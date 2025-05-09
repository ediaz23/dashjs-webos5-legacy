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

/**
 * Implementation of the EME APIs as of the 3 Feb 2014 state of the specification.
 *
 * Implemented by Internet Explorer 11 (Windows 8.1)
 *
 * @implements ProtectionModel
 * @class
 */

import ProtectionKeyController from '../controllers/ProtectionKeyController.js';
import NeedKey from '../vo/NeedKey.js';
import DashJSError from '../../vo/DashJSError.js';
import ProtectionErrors from '../errors/ProtectionErrors.js';
import KeyMessage from '../vo/KeyMessage.js';
import KeySystemConfiguration from '../vo/KeySystemConfiguration.js';
import KeySystemAccess from '../vo/KeySystemAccess.js';
import FactoryMaker from '../../../core/FactoryMaker.js';
import ProtectionConstants from '../../constants/ProtectionConstants.js';

function ProtectionModel_3Feb2014(config) {

    config = config || {};
    const context = this.context;
    const eventBus = config.eventBus;//Need to pass in here so we can use same instance since this is optional module
    const events = config.events;
    const debug = config.debug;
    const api = config.api;

    let instance,
        logger,
        videoElement,
        keySystem,
        mediaKeys,
        keySystemAccess,
        sessionTokens,
        eventHandler,
        protectionKeyController;

    function setup() {
        logger = debug.getLogger(instance);
        videoElement = null;
        keySystem = null;
        mediaKeys = null;
        keySystemAccess = null;
        sessionTokens = [];
        protectionKeyController = ProtectionKeyController(context).getInstance();
        eventHandler = createEventHandler();
    }

    function reset() {
        try {
            for (let i = 0; i < sessionTokens.length; i++) {
                closeKeySession(sessionTokens[i]);
            }
            if (videoElement) {
                videoElement.removeEventListener(api.needkey, eventHandler);
            }
            eventBus.trigger(events.TEARDOWN_COMPLETE);
        } catch (error) {
            eventBus.trigger(events.TEARDOWN_COMPLETE, { error: 'Error tearing down key sessions and MediaKeys! -- ' + error.message });
        }
    }

    function getAllInitData() {
        const retVal = [];
        for (let i = 0; i < sessionTokens.length; i++) {
            retVal.push(sessionTokens[i].initData);
        }
        return retVal;
    }

    function getSessionTokens() {
        return sessionTokens;
    }

    function requestKeySystemAccess(ksConfigurations) {
        return new Promise((resolve, reject) => {
            // Try key systems in order, first one with supported key system configuration
            // is used
            let found = false;
            for (let ksIdx = 0; ksIdx < ksConfigurations.length; ksIdx++) {
                const systemString = ksConfigurations[ksIdx].ks.systemString;
                const configs = ksConfigurations[ksIdx].configs;
                let supportedAudio = null;
                let supportedVideo = null;

                // Try key system configs in order, first one with supported audio/video
                // is used
                for (let configIdx = 0; configIdx < configs.length; configIdx++) {
                    const audios = configs[configIdx].audioCapabilities;
                    const videos = configs[configIdx].videoCapabilities;

                    // Look for supported audio container/codecs
                    if (audios && audios.length !== 0) {
                        supportedAudio = []; // Indicates that we have a requested audio config
                        for (let audioIdx = 0; audioIdx < audios.length; audioIdx++) {
                            if (window[api.MediaKeys].isTypeSupported(systemString, audios[audioIdx].contentType)) {
                                supportedAudio.push(audios[audioIdx]);
                            }
                        }
                    }

                    // Look for supported video container/codecs
                    if (videos && videos.length !== 0) {
                        supportedVideo = []; // Indicates that we have a requested video config
                        for (let videoIdx = 0; videoIdx < videos.length; videoIdx++) {
                            if (window[api.MediaKeys].isTypeSupported(systemString, videos[videoIdx].contentType)) {
                                supportedVideo.push(videos[videoIdx]);
                            }
                        }
                    }

                    // No supported audio or video in this configuration OR we have
                    // requested audio or video configuration that is not supported
                    if ((!supportedAudio && !supportedVideo) ||
                        (supportedAudio && supportedAudio.length === 0) ||
                        (supportedVideo && supportedVideo.length === 0)) {
                        continue;
                    }

                    // This configuration is supported
                    found = true;
                    const ksConfig = new KeySystemConfiguration(supportedAudio, supportedVideo);
                    const ks = protectionKeyController.getKeySystemBySystemString(systemString);
                    const keySystemAccess = new KeySystemAccess(ks, ksConfig);
                    eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, { data: keySystemAccess });
                    resolve({ data: keySystemAccess });
                    break;
                }
            }
            if (!found) {
                const errorMessage = 'Key system access denied! -- No valid audio/video content configurations detected!';
                eventBus.trigger(events.KEY_SYSTEM_ACCESS_COMPLETE, { error: errorMessage });
                reject({ error: errorMessage });
            }
        })
    }

    function selectKeySystem(ksAccess) {
        return new Promise((resolve, reject) => {
            try {
                mediaKeys = ksAccess.mediaKeys = new window[api.MediaKeys](ksAccess.keySystem.systemString);
                keySystem = ksAccess.keySystem;
                keySystemAccess = ksAccess;
                if (videoElement) {
                    setMediaKeys();
                }
                resolve(keySystem);
            } catch (error) {
                reject({ error: 'Error selecting keys system (' + keySystem.systemString + ')! Could not create MediaKeys -- TODO' });
            }
        })
    }

    function setMediaElement(mediaElement) {
        if (videoElement === mediaElement) {
            return;
        }

        // Replacing the previous element
        if (videoElement) {
            videoElement.removeEventListener(api.needkey, eventHandler);
        }

        videoElement = mediaElement;

        // Only if we are not detaching from the existing element
        if (videoElement) {
            videoElement.addEventListener(api.needkey, eventHandler);
            if (mediaKeys) {
                setMediaKeys();
            }
        }
    }

    function createKeySession(ksInfo) {
        if (!keySystem || !mediaKeys || !keySystemAccess) {
            throw new Error('Can not create sessions until you have selected a key system');
        }

        // Use the first video capability for the contentType.
        // TODO:  Not sure if there is a way to concatenate all capability data into a RFC6386-compatible format

        // If player is trying to playback Audio only stream - don't error out.
        let capabilities = null;

        if (keySystemAccess.ksConfiguration.videoCapabilities && keySystemAccess.ksConfiguration.videoCapabilities.length > 0) {
            capabilities = keySystemAccess.ksConfiguration.videoCapabilities[0];
        }

        if (capabilities === null && keySystemAccess.ksConfiguration.audioCapabilities && keySystemAccess.ksConfiguration.audioCapabilities.length > 0) {
            capabilities = keySystemAccess.ksConfiguration.audioCapabilities[0];
        }

        if (capabilities === null) {
            throw new Error('Can not create sessions for unknown content types.');
        }

        const contentType = capabilities.contentType;
        const session = mediaKeys.createSession(contentType, new Uint8Array(ksInfo.initData), ksInfo.cdmData ? new Uint8Array(ksInfo.cdmData) : null);
        const sessionToken = createSessionToken(session, ksInfo);

        // Add all event listeners
        session.addEventListener(api.error, sessionToken);
        session.addEventListener(api.message, sessionToken);
        session.addEventListener(api.ready, sessionToken);
        session.addEventListener(api.close, sessionToken);

        // Add to our session list
        sessionTokens.push(sessionToken);
        logger.debug('DRM: Session created.  SessionID = ' + sessionToken.getSessionId());
        eventBus.trigger(events.KEY_SESSION_CREATED, { data: sessionToken });
    }

    function updateKeySession(sessionToken, message) {
        const session = sessionToken.session;

        if (!protectionKeyController.isClearKey(keySystem)) {
            // Send our request to the key session
            session.update(new Uint8Array(message));
        } else {
            // For clearkey, message is a ClearKeyKeySet
            session.update(new Uint8Array(message.toJWK()));
        }
        eventBus.trigger(events.KEY_SESSION_UPDATED);
    }

    /**
     * Close the given session and release all associated keys.  Following
     * this call, the sessionToken becomes invalid
     *
     * @param {Object} sessionToken - the session token
     */
    function closeKeySession(sessionToken) {
        const session = sessionToken.session;

        // Remove event listeners
        session.removeEventListener(api.error, sessionToken);
        session.removeEventListener(api.message, sessionToken);
        session.removeEventListener(api.ready, sessionToken);
        session.removeEventListener(api.close, sessionToken);

        // Remove from our session list
        for (let i = 0; i < sessionTokens.length; i++) {
            if (sessionTokens[i] === sessionToken) {
                sessionTokens.splice(i, 1);
                break;
            }
        }

        // Send our request to the key session
        session[api.release]();
    }

    function setServerCertificate(/*serverCertificate*/) { /* Not supported */
    }

    function loadKeySession(/*ksInfo*/) { /* Not supported */
    }

    function removeKeySession(/*sessionToken*/) { /* Not supported */
    }


    function createEventHandler() {
        return {
            handleEvent: function (event) {
                switch (event.type) {

                    case api.needkey:
                        if (event.initData) {
                            const initData = ArrayBuffer.isView(event.initData) ? event.initData.buffer : event.initData;
                            eventBus.trigger(events.NEED_KEY, { key: new NeedKey(initData, ProtectionConstants.INITIALIZATION_DATA_TYPE_CENC) });
                        }
                        break;
                }
            }
        };
    }


    // IE11 does not let you set MediaKeys until it has entered a certain
    // readyState, so we need this logic to ensure we don't set the keys
    // too early
    function setMediaKeys() {
        let boundDoSetKeys = null;
        const doSetKeys = function () {
            videoElement.removeEventListener('loadedmetadata', boundDoSetKeys);
            videoElement[api.setMediaKeys](mediaKeys);
            eventBus.trigger(events.VIDEO_ELEMENT_SELECTED);
        };
        if (videoElement.readyState >= 1) {
            doSetKeys();
        } else {
            boundDoSetKeys = doSetKeys.bind(this);
            videoElement.addEventListener('loadedmetadata', boundDoSetKeys);
        }

    }

    // Function to create our session token objects which manage the EME
    // MediaKeySession and session-specific event handler
    function createSessionToken(keySession, ksInfo) {
        return {
            // Implements SessionToken
            session: keySession,
            keyId: ksInfo.keyId,
            normalizedKeyId: ksInfo && ksInfo.keyId && typeof ksInfo.keyId === 'string' ? ksInfo.keyId.replace(/-/g, '').toLowerCase() : '',
            initData: ksInfo.initData,
            hasTriggeredKeyStatusMapUpdate: false,

            getKeyId: function () {
                return this.keyId;
            },

            getSessionId: function () {
                return this.session.sessionId;
            },

            getExpirationTime: function () {
                return NaN;
            },

            getSessionType: function () {
                return 'temporary';
            },

            getKeyStatuses: function () {
                return {
                    size: 0,
                    has: () => {
                        return false
                    },
                    get: () => {
                        return undefined
                    }
                }
            },

            // This is our main event handler for all desired MediaKeySession events
            // These events are translated into our API-independent versions of the
            // same events
            handleEvent: function (event) {
                switch (event.type) {
                    case api.error:
                        let errorStr = 'KeyError'; // TODO: Make better string from event
                        eventBus.trigger(events.KEY_ERROR, { error: new DashJSError(ProtectionErrors.MEDIA_KEYERR_CODE, errorStr, this) });
                        break;
                    case api.message:
                        let message = ArrayBuffer.isView(event.message) ? event.message.buffer : event.message;
                        eventBus.trigger(events.INTERNAL_KEY_MESSAGE, { data: new KeyMessage(this, message, event.destinationURL) });
                        break;
                    case api.ready:
                        logger.debug('DRM: Key added.');
                        eventBus.trigger(events.KEY_ADDED);
                        break;

                    case api.close:
                        logger.debug('DRM: Session closed.  SessionID = ' + this.getSessionId());
                        eventBus.trigger(events.KEY_SESSION_CLOSED, { data: this.getSessionId() });
                        break;
                }
            }
        };
    }

    instance = {
        getAllInitData,
        getSessionTokens,
        requestKeySystemAccess,
        selectKeySystem,
        setMediaElement,
        createKeySession,
        updateKeySession,
        closeKeySession,
        setServerCertificate,
        loadKeySession,
        removeKeySession,
        stop: reset,
        reset
    };

    setup();

    return instance;
}

ProtectionModel_3Feb2014.__dashjs_factory_name = 'ProtectionModel_3Feb2014';
export default FactoryMaker.getClassFactory(ProtectionModel_3Feb2014);
