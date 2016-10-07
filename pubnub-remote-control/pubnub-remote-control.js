/*!
 * reveal.js PubNub Remote Control Plugin v. 0.1
 * https://github.com/salvatorecordiano/reveal-js-pubnub-remote-control-plugin/
 *
 * Copyright (C) 2016 Salvatore Cordiano, http://www.salvatorecordiano.it/
 * Released under the MIT license
 */

(function() {

    'use strict';

    var options;

    var defaultProperties = {
        subscribeKey: null,
        inputChannel: 'input'
    };

    var PubnubRemoteControl = function PubnubRemoteControl(customProperties) {
        if (customProperties && typeof customProperties === "object") {
            this.options = extendDefaultProperties(defaultProperties, customProperties);
        }
        initPubnub(this.options.subscribeKey, this.options.inputChannel);
    }

    function initPubnub(subscribeKey, inputChannel) {
        var pubnub = PUBNUB.init({ subscribe_key: subscribeKey, ssl: (('https:' == document.location.protocol) ? true : false) });
        pubnub.subscribe({ channel: inputChannel, message: processInput });
    }

    function processInput(input) {
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
    }

    function extendDefaultProperties(defaultProperties, customProperties) {
        var property;
        for (property in customProperties) {
            if (customProperties.hasOwnProperty(property)) {
                defaultProperties[property] = customProperties[property];
            }
        }
        return defaultProperties;
    }

    Reveal.getConfig().pubnubRemoteControl && new PubnubRemoteControl(Reveal.getConfig().pubnubRemoteControl);

}());