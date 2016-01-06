var request = require('request')
var Q = require('q');
var proxyAddress = require('./secrets/config').proxyAddress;

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
    var deferred = Q.defer();
    //TODO if ENV == dev then...
    options.proxy = proxyAddress;
    
    request(options)
        .pipe(writeStream)
        .on('error', function(err) {
            console.log('error in request stream');
            deferred.reject(err);
        })
        .on('done', function() {
            deferred.resolve();
        });

    return deferred.promise;
}

module.exports = {
	getRequestBody,
    streamRequest
}