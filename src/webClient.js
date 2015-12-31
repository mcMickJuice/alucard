var request = require('request')
var Q = require('q');

var proxyAddress = 'http://127.0.0.1:8888';

function getRequestBody(options) {

	options.proxy = proxyAddress;

	var deferred = Q.defer();

	request(options, function(err, res, body) {
		if(err) {
			deferred.reject(err);
		}
		deferred.resolve(body);
	})

	return deferred.promise;
}


function streamRequest(options, streamWriter) {
    options.proxy = proxyAddress;
    
    return request(options)
        .pipe(streamWriter);
}

module.exports = {
	getRequestBody,
    streamRequest
}