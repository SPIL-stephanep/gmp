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
				execute_callback('pauseGame', "API loaded!");
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

function execute_callback(cbName, data) {
	//console.log(cb, typeof cb);
	if(SpilAPI_callbacks[cbName]) {
		SpilAPI_callbacks[cbName](data);
	}
}

//======= callback handler ========
// ispied by gmCallback 1.1
//By JacksonYarr, http://JacksonYarr.com/
//=================================

var SpilAPI_callbacks = new Object();

function SpilAPI_has_callback(extname, numargs) {
	if(SpilAPI_callbacks[extname] !== undefined) {
		return true;
	}
	
	var obFunc = window["SpilAPI_has_callback"].caller.name;

	// IE Patch
	if(obFunc === undefined) {
		obFunc = arguments.callee.caller.toString().match(/function ([^\(]+)/)[1];
	}
	
	var args = "";
	var gmres = "0,0";
	
	if(numargs > 0) {
		while(numargs > 0) {
			args = "arg"+numargs+","+args;
			numargs--;
		}
		
		args = args.slice(0,-1);
		gmres = gmres+",";
	}
	
	SpilAPI_callbacks[extname] = eval("(function("+ args +"){"+ obFunc +"("+ gmres + args +");})");
	
	return false;
}

function SpilAPI_define_callback(extname, gmscript) {
	if(SpilAPI_callbacks[extname] !== undefined) {
		return true;
	}
	
	return false;
}