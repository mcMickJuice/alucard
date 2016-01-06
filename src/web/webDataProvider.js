var parser = require('./../htmlParse/htmlParser').parseHtmlAndMap;
var webClient = require('./webClient');
var romRequestConfig = require('./../secrets/romRequestConfig');

var {romHost, cookieString, downloadLinkSelector, gameListLinkSelector, userAgent} = romRequestConfig;

function getLinksForConsole(consoleObj) {
	var consoleName = consoleObj.console;

	var requestObj = {
		url: consoleObj.allGamesUrl
	};
	
	//fetchHtml
	return webClient.getRequestBody(requestObj )
		.then(html => {
	//parseHtml into objects
		function mapLink($wrapped) {
			return {
				title: $wrapped.text(),
				url: $wrapped.attr('href'),
				consoleName: consoleName
			}
		}

		return parser(html, gameListLinkSelector, mapLink);
		})
}
var requiredHeaders = {
			"Cookie" : cookieString,
			"User-Agent": userAgent
		};

function getDownloadLink(gameUrl) {
	var requestObj = {
		url: `${gameUrl}-download`,
		headers: requiredHeaders
	};
    
    function mapLink($wrapped) {
        return $wrapped.attr('href')
    }

	return webClient.getRequestBody(requestObj)
    .then(html => {
        var link = parser(html,downloadLinkSelector, mapLink)[0];
        return link;
    });
}

function downloadGame(downloadUrl, writeStream) {
    var requestObj = {
        url: `${romHost}${downloadUrl}`,
        headers: requiredHeaders
    };
    
    return webClient.streamRequest(requestObj, writeStream)
}


module.exports = {
	getLinksForConsole,
	getDownloadLink,
    downloadGame
};