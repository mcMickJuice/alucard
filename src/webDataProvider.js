var parser = require('./htmlParse/htmlParser').parseHtmlAndMap
var webClient = require('./webClient')

//Make request to external site, return data from parsed html

var selector = 'a.index.gamelist';
var collectionName = 'roms';

function getLinksForConsole(consoleObj) {
	var consoleName = consoleObj.console;

	var requestObj = {
		url: consoleObj.allGamesUrl
	}
	
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

		return parser(html, selector, mapLink);
		})
}

var cookieString = 'downloadcaptcha= 1; refexception= 1';
var downloadLinkId = '#download-link';
var userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36';

var requiredHeaders = {
			"Cookie" : cookieString,
			"User-Agent": userAgent
		};

//get downloadLink
function getDownloadLink(gameUrl) {
	var requestObj = {
		url: `${gameUrl}-download`,
		headers: requiredHeaders
	}
    
    function mapLink($wrapped) {
        return $wrapped.attr('href')
    }

	return webClient.getRequestBody(requestObj)
    .then(html => {
        var link = parser(html,downloadLinkId, mapLink)[0];
        return link;
    });
}

var host = 'http://www.emuparadise.me';
function downloadGame(downloadUrl, writeStream) {
    var requestObj = {
        url: `${host}${downloadUrl}`,
        headers: requiredHeaders
    }
    
    return webClient.streamRequest(requestObj, writeStream)
}


module.exports = {
	getLinksForConsole,
	getDownloadLink,
    downloadGame
}