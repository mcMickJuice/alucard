var parser = require('./../utility/htmlParser').parseHtmlAndMap;
var webClient = require('./webClient');
var romRequestConfig = require('./../secrets/romRequestConfig');
var Q = require('q');

var {cookieString, downloadLinkSelector, gameListLinkSelector, userAgent} = romRequestConfig;

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
			'Cookie' : cookieString,
			'User-Agent': userAgent
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

function downloadGame(downloadUrl, writeStream, reporter) {
    var requestObj = {
        url: downloadUrl,
        headers: requiredHeaders
    };
    
    return webClient.streamRequest(requestObj, writeStream, reporter)
}

//registers reporter with data events, returns initialized writeStream
//function initializeWriteStreamAndReporter(requestPromise,streamFactory, reporter) {
//    var deferred = Q.defer();
//
//
//
//    return deferred.promise;
//}

function downloadGameBetter(downloadUrl, writeStreamFactory, reporter) {
	var deferred = Q.defer();
	var requestObj = {
		url: downloadUrl,
		headers: requiredHeaders,
		method: 'GET'
	};

    webClient.getRequestStreamBhttp(downloadUrl, requestObj).then(resp => {
		//grab vgame name out of url
		var path = resp.req.path;
		var encodedGameName = path.split('/').reverse()[0];
		var fileName = decodeURI(encodedGameName);
		var writeStreamPromise = writeStreamFactory(fileName);
		return Q.all([Q.when(resp), writeStreamPromise]);
	})
	.spread((resp, writeStream) => {
		resp.on('end', () => deferred.resolve())

		if(reporter) {
			resp
				.on('progress', (completed, total) => {
					reporter({
						completed,
						total
					});
				})
		}

		resp.pipe(writeStream);
        //return resp;
	});

	return deferred.promise;
}


module.exports = {
	getLinksForConsole,
	getDownloadLink,
    downloadGame,
    downloadGameBetter
};