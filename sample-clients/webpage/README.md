# reveal.js PubNub Remote Control Client

## Installation

Install dependencies using Bower with the following command.

```
bower install
```

Update configuration inside the file ```resources/custom/remote-control-client.js``` with the PubNub API keys.

```javascript
var pubnub = PUBNUB({
	publish_key : '---INSERT KEY HERE---',		// PubNub publish key
    subscribe_key : '---INSERT KEY HERE---'		// PubNub subscribe key
});
```
