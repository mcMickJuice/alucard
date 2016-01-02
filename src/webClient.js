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


function streamRequest(options, writeStream) {
    options.proxy = proxyAddress;
    
    return request(options)
        .pipe(writeStream)
        .on('error', function(err) {
            console.log('error in request stream')
            console.log(err.stack);
        });
}

module.exports = {
	getRequestBody,
    streamRequest
}