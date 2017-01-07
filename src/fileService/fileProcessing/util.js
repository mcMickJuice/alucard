var Q = require('q')
var fs = require('fs')
var path = require('path')

//TODO move to util function. this is used by unzip and 7zip
module.exports.listCreatedFiles = function listCreatedFiles(extractFolder) {
    var deferred = Q.defer();

    fs.readdir(extractFolder, function(err, fileList) {
        if(err) {
            deferred.reject(err);
            return;
        }

        if(fileList.length === 0){
            deferred.reject(new Error('Extract file list is empty! No files to process!'));
            return;
        }

        var files = fileList.map(fileName => path.resolve(extractFolder, fileName));

        deferred.resolve(files);
    });

    return deferred.promise;
}