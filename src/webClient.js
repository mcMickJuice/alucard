var http = require('http');
var Q = require('q');

function makeRequest(options, onData, onEnd, onError) {
	var contentBody = '';
	var req = http.request(options, function(res) {
		console.log(`RESPONSE STATUS: ${res.statusCode}`);

		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			if(onData) {
				onData(chunk);
			}

			contentBody += chunk;
			console.log('chunk received')
		})

		res.on('end', function() {
			onEnd(contentBody);
		})
	})

	req.on('error', onError)

	req.end();
}

module.exports = {
	makeRequest
}