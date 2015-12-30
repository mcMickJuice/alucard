var request = require('request')
var Q = require('q');

function makeRequest(options) {

	options.proxy = 'http://127.0.0.1:8888';

	var deferred = Q.defer();

	var contentBody = '';
	request(options, function(err, res, body) {
		if(err) {
			deferred.reject(err);
		}
		deferred.resolve(body);
	})

	return deferred.promise;
}

module.exports = {
	makeRequest
}