var request = require('request')
var Q = require('q');
//var proxyAddress = require('./secrets/config').proxyAddress;

function getRequestBody(options) {

    //options.proxy = proxyAddress;

    var deferred = Q.defer();

    request(options, function (err, res, body) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve(body);
    })

    return deferred.promise;
}

function postRequest(options) {
    var deferred = Q.defer();
    options.method = 'POST';
    options.json = true;

    request(options, function (err, res) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve(res);
    });

    return deferred.promise;
}


function streamRequest(options, writeStream, reporter) {
    var deferred = Q.defer();
    ////TODO if ENV == dev then...
    //options.proxy = proxyAddress;
    var requestStream = request(options);


    if (reporter) {
        var fileSize = 0;
        var progress = 0;
        requestStream
            .on('response', resp => {
                var length = resp.headers['content-length'];
                fileSize = parseInt(length);
            })

            .on('data', function (chunk) {
                progress += chunk.length;
                reporter({
                    progress,
                    fileSize
                })
            })
    }

    requestStream.on('error', function (err) {
        console.log('error in request stream');
        deferred.reject(err);
    })

    requestStream
        .pipe(writeStream)
        .on('error', function (err) {
            console.log('error in request stream');
            deferred.reject(err);
        })
        .on('finish', function () {
            deferred.resolve();
        });


    return deferred.promise;
}

module.exports = {
    getRequestBody,
    postRequest,
    streamRequest
}