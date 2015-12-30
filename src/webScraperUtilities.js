var fs = require('fs')
var parser = require('./htmlParse/htmlParser').parseHtmlAndMap
var webClient = require('./webClient')


var selector = 'a.index.gamelist';
var collectionName = 'roms';

function getLinksForConsole(consoleObj) {
	var consoleName = consoleObj.console;

	var requestObj = {
		url: consoleObj.allGamesUrl
	}
	
	//fetchHtml
	return webClient.makeRequest(requestObj )
		.then(html => {
	//parseHtml into objects
		function mapLink($wrapped) {
			return {
				title: $wrapped.text(),
				url: $wrapped.attr('href'),
				consoleName: consoleName
			}
		}

		return parser(html, selector, mapLink);
		})
}

var cookieString = 'downloadcaptcha= 1; refexception= 1';
var downloadLinkId = '';
var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36';

function getDownloadString(gameUrl) {
	var requestObj = {
		url: `${gameUrl}-download`,
		headers: {
			"Cookie" : cookieString,
			"User-Agent": userAgent
		}
	}

	return webClient.makeRequest(requestObj);

	//add cookies for captcha and referrer
	//
	//get download html, scrape page for downloadlink, return downloadLink
}


module.exports = {
	getLinksForConsole,
	getDownloadString
}