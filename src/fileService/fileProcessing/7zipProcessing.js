var spawn = require('child_process').spawn;
var _7Zip = require('7zip')['7z'];
var path = require('path')
var Q = require('q')
var {listCreatedFiles} = require('./util')

function unzipFile(filePath) {
    return unZipFilesContents(filePath)
        .then(listCreatedFiles);
}

function unZipFilesContents(filePath) {
    var deferred = Q.defer();
    var pathInfo = path.parse(filePath);
    var currentDirectory = pathInfo.dir;
    var destinationPath = path.resolve(currentDirectory, 'temp', Date.now().toString());
    var task = spawn(_7Zip, ['x', filePath, '-o' + destinationPath, '-y'])

    task.stderr.on('data', err => {
        console.log(`7Zip error: ${err}`)
        deferred.reject(err);
    })

    task.on('close', () => {
        deferred.resolve(destinationPath)
    })

    return deferred.promise;
}

module.exports = {
    process: unzipFile
}