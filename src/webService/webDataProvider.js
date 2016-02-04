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
		headers: requiredHeaders
	};

	var requestPromise = webClient.getRequestStreamBhttp(downloadUrl, requestObj);

    //attach on events to request Stream.
    //initializeWriteStreamAndReporter(requestPromise, writeStreamFactory, reporter)
    //    .then(writeStream => {
    //        requestPromise
    //            .pipe(writeStream)
    //            .on('error', err => {
    //                console.log('error in request stream');
    //                deferred.reject(err);
    //            })
    //            .on('finish', () => deferred.resolve());
    //    });
    //on response, create writeStream

    requestPromise.then(resp => {
        //grab vgame name out of url
        var path = resp.req.path;
        var encodedGameName = path.split('/').reverse()[0];
        var fileName = decodeURI(encodedGameName);
        var writeStream = writeStreamFactory(fileName);

		resp.on('finish', () => deferred.resolve())

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
    });


    //pipe requestPromise to writeStream
	return deferred.promise;
}


module.exports = {
	getLinksForConsole,
	getDownloadLink,
    downloadGame,
    downloadGameBetter
};