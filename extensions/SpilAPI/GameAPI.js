function SpilAPI_injectAPI(callback) {
	var s = document.createElement('script');
	s.src = 'http://cdn.gameplayer.io/api/js/game.js';
	s.id = 'spil-api';
	document.getElementsByTagName('head')[0].appendChild(s);

	s.onload = function() {
		callback.call(this);
	};
}

function SpilAPI_loadAPI(AppID) {
	SpilAPI_injectAPI(function() {
		if(window && window.GameAPI) {
			window.GameAPI.loadAPI(function(instance) {
				console.log('SPIL Game API v' + instance.version + ' loaded in Game Maker!');
				return true;
			}, {id: AppID});
		} else {
			return false;
		}
	});
}

function SpilAPI_isReady() {
	return window.GameAPI.isReady;
}