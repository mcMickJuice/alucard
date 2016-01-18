var postRequest = require('../webService/webClient').postRequest;
var config = require('../secrets/config');

var webAddress = `${config.hostAddress}:${config.webPort}`;
var routes = {
    progress: '/download/progress',
    error: '/download/error',
    complete: '/download/complete'
}

function buildUrl(type) {
    var route = routes[type];

    return `${webAddress}${route}`;
}

function makeRequest(url, payload) {
    var options = {
        url,
        body: payload
    };

    return postRequest(options);
}

function onDownloadFinish(downloadInfo) {
    var url = buildUrl('complete');

    return makeRequest(url, {downloadInfo});
}

function onProgress(progressInfo) {
    var url = buildUrl('progress');

    return makeRequest(url, {progressInfo})
}

function onError(errorInfo) {
    var url = buildUrl('error');

    return makeRequest(url, {error: errorInfo});
}

module.exports = {
    onDownloadFinish,
    onProgress,
    onError
}