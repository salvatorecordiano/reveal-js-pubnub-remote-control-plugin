# reveal.js PubNub Remote Control Plugin

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) allowing to easily use PubNub API to advance through your slides. It allows automatically advances the slideshow to the next slide or fragment. 

## Installation

Copy the files ```pubnub-remote-control.js``` into the plugin folder of your reveal.js presentation, i.e. ```plugin/pubnub-remote-control```.

Add the plugins to the dependencies in your presentation, as below. 

```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ...
		{ src: 'https://cdn.pubnub.com/pubnub-3.16.4.min.js', async: true },
		{ src: 'plugin/pubnub-remote-control/pubnub-remote-control.js', async: true },
		// ... 
	]
});
```
