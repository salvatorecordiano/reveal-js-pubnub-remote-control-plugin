'use strict';

var pubnub = new PubNub({
    publishKey: '---INSERT KEY HERE---',
    subscribeKey: '---INSERT KEY HERE---',
    ssl: true
});

pubnub.addListener({
    message: function(event) {
        var message = event.message;
        jQuery('#display').text(message.slide + '.' + message.part);
    }
});

pubnub.subscribe({
    channels: ['output']
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('.btn').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
});
