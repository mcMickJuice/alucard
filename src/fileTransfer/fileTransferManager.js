var moveFile = require('./fileTransfer').moveFile;
var piDestinationRoot = require('../secrets/fileProcessingConfig').basePiPath;
var Q = require('q');
var path = require('path');

function stdout() {
    console.log(arguments);
}

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
    var defaultReporter = reporter || stdout;
    var destinationPath = `${piDestinationRoot}${consolePath}/${fileName}`;
    moveFile(localPath, destinationPath, defaultReporter, onCompletion);

    return deferred.promise;
}

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