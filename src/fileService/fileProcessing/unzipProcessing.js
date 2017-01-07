var unzip = require('unzip');
var fs = require('fs');
var path = require('path');
var Q = require('q');
var {listCreatedFiles} = require('./util')

//unzip Process reporting isn't working. Can't get full file size...also it might not matter. Might only need this for
//psx processing
function unzipFile(filePath){
    return unzipFileContentsToTemp(filePath)
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
        ////TODO does this work?
        //.on('data', function(data) {
        //    reporter(data.length);
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



module.exports = {
    process: unzipFile
};