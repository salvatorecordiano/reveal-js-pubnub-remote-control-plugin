/*!
 * reveal.js PubNub Remote Control Plugin v. 0.1
 * https://github.com/salvatorecordiano/reveal-js-pubnub-remote-control-plugin/
 *
 * Copyright (C) 2016 Salvatore Cordiano, http://www.salvatorecordiano.it/
 * Released under the MIT license
 */

(function() {

    'use strict';

    var options, pubnub;
    var defaultProperties = {
        publishKey: null,
        subscribeKey: null,
        inputChannel: 'input'
    };

    var PubnubRemoteControl = function PubnubRemoteControl(customProperties) {
        if (customProperties && typeof customProperties === "object") {
            this.options = this.extendDefaultProperties(defaultProperties, customProperties);
        }
        this.initPubnub(this.options.subscribeKey, this.options.inputChannel);
    }

    PubnubRemoteControl.prototype = {
        initPubnub: function initPubnub(subscribeKey, inputChannel) {
            pubnub = PUBNUB.init({ subscribe_key: subscribeKey, ssl: (('https:' == document.location.protocol) ? true : false) });
            pubnub.subscribe({ channel: inputChannel, message: this.processInput });
        },
        processInput: function processInput(input) {
            if(input && typeof input === "object" && input.button) {
                switch (input.button) {
                    case 'left' :
                        Reveal.navigateLeft();
                        break;
                    case 'right' :
                        Reveal.navigateRight();
                        break;
                    case 'up' :
                        Reveal.navigateUp();
                        break;
                    case 'down' :
                        Reveal.navigateDown();
                        break;
                }
            }
        },
        extendDefaultProperties: function extendDefaultProperties(defaultProperties, customProperties) {
            var property;
            for (property in customProperties) {
                if (customProperties.hasOwnProperty(property)) {
                    defaultProperties[property] = customProperties[property];
                }
            }
            return defaultProperties;
        }
    }
    
    Reveal.getConfig().pubnubRemoteControl && new PubnubRemoteControl(Reveal.getConfig().pubnubRemoteControl);

}());
