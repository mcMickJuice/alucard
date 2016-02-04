var request = require('request')
var Q = require('q');
var bhttp = require('bhttp');
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

function getRequestStreamPromise(url, options) {
    options.stream = true;
    return bhttp.request(url, options);
}

module.exports = {
    getRequestBody,
    postRequest,
    getRequestStreamPromise
}