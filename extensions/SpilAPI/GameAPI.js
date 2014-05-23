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
	if(gmCallback[cbName]) {
		gmCallback[cbName](data);
	}
}

//======= GM Callback v1.1 ========
//By JacksonYarr
//Website: http://JacksonYarr.com/
//License: Creative Commons Attribution 3.0 Unported License
//=================================

var gmCallback = new Object();

function callback_script(extname,numargs)
{
	if(gmCallback[extname] != undefined)
	{return true;}
	
	var obFunc = window["callback_script"].caller.name;

	if(obFunc == undefined) //IE always makes things difficult.
	{obFunc = arguments.callee.caller.toString().match(/function ([^\(]+)/)[1];}
	
	var args = "";
	var gmres = "0,0";
	
	if(numargs > 0)
	{
		while(numargs > 0)
		{
			args = "arg"+numargs+","+args;
			numargs--;
		}
		
		args = args.slice(0,-1);
		gmres = gmres+",";
	}
	
	gmCallback[extname] = eval("(function("+ args +"){"+ obFunc +"("+ gmres + args +");})");
	
	return false;
}

function callback_define_script(extname,gmscript)
{
	if(gmCallback[extname] != undefined)
	{return true;}
	
	return false;
}