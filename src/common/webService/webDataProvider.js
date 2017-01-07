var {parseHtmlAndMap} = require('./../utility/htmlParser');
var webClient = require('./webClient');
var Q = require('q');

   var cookieString= 'downloadcaptcha= 1; refexception= 1';
   var downloadLinkSelector= '#download-link';
   var gameListLinkSelector= 'a.index.gamelist';
   var userAgent= 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36';


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

		return parseHtmlAndMap(html, gameListLinkSelector, mapLink);
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
        var link = parseHtmlAndMap(html,downloadLinkSelector, mapLink)[0];
        return link;
    });
}

function downloadGame(downloadUrl, writeStreamFactory, reporter) {
	var deferred = Q.defer();
	var requestObj = {
		url: downloadUrl,
		headers: requiredHeaders,
		method: 'GET'
	};

    webClient.getRequestStreamPromise(downloadUrl, requestObj).then(resp => {
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
						progress: completed,
						fileSize: total
					});
				})
		}

		resp.pipe(writeStream);
	});

	return deferred.promise;
}


module.exports = {
	getLinksForConsole,
	getDownloadLink,
    downloadGame
};