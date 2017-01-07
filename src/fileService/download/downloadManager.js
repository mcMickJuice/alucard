var {baseOutputDir, romFileDir} = require('../config');
var download = require('alucard-common/webService/webDataProvider').downloadGame;
var ensureDirectory = require('alucard-common/utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');
var path = require('path');

function downloadGame(downloadUrl, romInfo, onProgress) {
    //bad dirty bad!
    var outputPath;
    function writeStreamFactory(fileName) {
        var romDir = path.join(baseOutputDir, romFileDir, romInfo.consoleName);
        outputPath = path.join(romDir, fileName);

        return createWriteStream(romDir, outputPath);
    }

    return download(downloadUrl, writeStreamFactory, onProgress)
        .then(() => {
            return {
                rom: romInfo,
                filePath: outputPath
            }
        });
}

function createWriteStream(directory,filePath) {
    return ensureDirectory(directory)
        .then(() => {
            var writeStream = fs.createWriteStream(filePath);

            return writeStream;
        });
}

module.exports.downloadGame = downloadGame;