var pubnub = PUBNUB({
    publish_key : 'pub-c-7bcb14c8-16bf-49ae-a7d1-d22ff6f739cd',
    subscribe_key : 'sub-c-de5c2a9a-8c04-11e6-8c91-02ee2ddab7fe'
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
