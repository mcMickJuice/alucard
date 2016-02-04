var config = require('../secrets/config');
var download = require('../webService/webDataProvider').downloadGame;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');

function downloadGame(downloadUrl, romInfo, onProgress) {
    //bad dirty bad!
    var outputPath;
    function writeStreamFactory(fileName) {
        var romDir = `${config.baseOutputDir}/${config.romFileDir}/${romInfo.consoleName}`;
        outputPath = `${romDir}/${fileName}`;

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