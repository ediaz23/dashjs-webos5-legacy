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

import {HTTPRequest} from './metrics/HTTPRequest.js';

/**
 * @class
 * @ignore
 */
class FragmentRequest {
    constructor(url) {
        this.action = FragmentRequest.ACTION_DOWNLOAD;
        this.availabilityEndTime = null;
        this.availabilityStartTime = null;
        this.bandwidth = NaN;
        this.bytesLoaded = NaN;
        this.bytesTotal = NaN;
        this.delayLoadingTime = NaN;
        this.duration = NaN;
        this.endDate = null;
        this.firstByteDate = null;
        this.index = NaN;
        this.mediaStartTime = NaN;
        this.mediaType = null;
        this.range = null;
        this.representation = null;
        this.responseType = 'arraybuffer';
        this.retryAttempts = 0;
        this.serviceLocation = null;
        this.startDate = null;
        this.startTime = NaN;
        this.timescale = NaN;
        this.type = null;
        this.url = url || null;
        this.wallStartTime = null;
    }

    isInitializationRequest() {
        return (this.type && this.type === HTTPRequest.INIT_SEGMENT_TYPE);
    }

    setInfo(info) {
        this.type = info && info.init ? HTTPRequest.INIT_SEGMENT_TYPE : HTTPRequest.MEDIA_SEGMENT_TYPE;
        this.url = info && info.url ? info.url : null;
        this.range = info && info.range ? info.range.start + '-' + info.range.end : null;
        this.mediaType = info && info.mediaType ? info.mediaType : null;
        this.representation = info && info.representation ? info.representation : null;
    }
}

FragmentRequest.ACTION_DOWNLOAD = 'download';
FragmentRequest.ACTION_COMPLETE = 'complete';

export default FragmentRequest;
