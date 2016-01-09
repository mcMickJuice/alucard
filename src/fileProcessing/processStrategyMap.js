var noop = require('./noopProcessing');
var unzip = require('./unzipProcessing');
var rar = require('./rarProcessing');

/*
Strategy Contract:
-method name process
-params - filepath to the raw downloaded file, optional reporter to report progress
-return a promise<T>
-T is array of filePaths that can be moved
 */

module.exports = {
    'nes': noop,
    'snes': noop,
    'genesis': noop,
    'n64': unzip,
    'psx': rar
}