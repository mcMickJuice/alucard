var mkdir = require('mkdirp');
var Q = require('q');

function ensureDirectory(directory, cb) {
    mkdir(directory, cb);
}

module.exports.ensureDirectory = ensureDirectory;

module.exports.ensureDirectoryPromise = function(directory) {
    var deferred = Q.defer();

    ensureDirectory(directory, err => {
        if(err) {
            deferred.reject(err);
            return;
        }

        deferred.resolve();
    })

    return deferred.promise;
}