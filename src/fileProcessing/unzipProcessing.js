var unzip = require('unzip');
var fs = require('fs');
var path = require('path');
var Q = require('q');

function unzipFile(filePath, reporter){
    return unzipFileContentsToTemp(filePath, reporter)
        .then(listCreatedFiles)
}

function unzipFileContentsToTemp(filePath) {
    var deferred = Q.defer();
    var readStream = fs.createReadStream(filePath)
    var pathInfo = path.parse(filePath);
    var currentDirectory = pathInfo.dir;
    var destinationFolder = path.resolve(currentDirectory, 'temp', Date.now().toString());
    //unzip contents
    readStream
        //TODO does this work?
        //.on('data', function(data) {
        //    reporter(data);
        //})
        .pipe(unzip.Extract({path: destinationFolder}))
        .on('close', function() {
            readStream.close();
            deferred.resolve(destinationFolder)
        })
        .on('error', function(err) {
            readStream.close();
           deferred.reject(err);
        });

    return deferred.promise;
}

function listCreatedFiles(extractFolder) {
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

module.exports = {
    process: unzipFile
};