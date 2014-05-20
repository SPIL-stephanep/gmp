function injectAPI(callback) {
	var s = document.createElement('script');
	s.src = 'http://cdn.gameplayer.io/api/js/game.js';
	s.id = 'spil-api';
	document.getElementsByTagName('head')[0].appendChild(s);

	s.onload = function() {
		callback.call(this);
	};
}

function SpilAPI_loadAPI(AppID) {
	injectAPI(function() {
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
	return (window.GameAPI && window.GameAPI.isReady);
}

function SpilAPI_getLogo() {
	var logoData = window.GameAPI.Branding.getLogo(),
		logoLink = JSON.parse(SpilAPI_getLink('logo'));

	return JSON.stringify({
		linkName: 'logo',
		image: logoData.image || '',
		url: logoLink.url || ''
	});
}

function SpilAPI_getLink(linkName) {
	var linkData = window.GameAPI.Branding._getGMLink(linkName);
	return JSON.stringify(linkData);
}

function SpilAPI_listLinks () {
	var linkList = window.GameAPI.Branding.listLinks();
	return JSON.stringify(linkList);
}