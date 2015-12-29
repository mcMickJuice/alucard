var http = require('http');
var Q = require('q');

function makeRequest(options) {
	var deferred = Q.defer();

	var contentBody = '';
	var req = http.request(options, function(res) {

		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			contentBody += chunk
		})

		res.on('end', function() {
			console.log('were done!');
			deferred.resolve(contentBody);
		})
	})

	req.on('error', err => {
		deferred.reject('something fhappened!');
	})

	req.end();

	return deferred.promise;
}

module.exports = {
	makeRequest
}