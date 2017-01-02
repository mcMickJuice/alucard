var {moveFile} = require('./fileTransfer');
var {fileProcessingConfig: {basePiPath}} = require('../../common/config');
var Q = require('q');
var path = require('path');

function moveFileToPi(localPath, consolePath, reporter) {
    var deferred = Q.defer();

    function onCompletion(err) {
        if(err) {
            deferred.reject(err);
            return;
        }

        deferred.resolve();
    }

    var fileName = path.parse(localPath).base;

    //ensure forward slashes so that file copy to linux works correctly
    //TODO have this detail be in the moveFile/fileTransfer implementation
    //should be file system agnostic
    var destinationPath = basePiPath + consolePath + '/' + fileName; 
    moveFile(localPath, destinationPath, reporter, onCompletion);

    return deferred.promise;
}

module.exports = {
    moveFileToPi
}