var moveFile = require('./fileTransfer').moveFile;
var {fileProcessingConfig: {basePiPath}} = require('../config');
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
    var destinationPath = path.join(basePiPath,consolePath, fileName);
    moveFile(localPath, destinationPath, reporter, onCompletion);

    return deferred.promise;
}

////TODO add these features
//function moveFileToBackup(tempPath, destinationPath) {
//    throw new Error(`${moveFileToBackup} not yet implemented`);
//}
//
//function removeFileFromPi(consolePath, file) {
//    throw new Error(`${removeFileFromPi} not yet implemented`);
//}

module.exports = {
    moveFileToPi
    //moveFileToBackup,
    //removeFileFromPi
}