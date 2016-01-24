var config = require('../secrets/config');
//var download = require('../webService/webDataProvider').downloadGame;
var download = require('../webService/webDataProvider').downloadGameBetter;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');

function downloadGame(downloadUrl, romInfo, onProgress) {

    function writeStreamFactory(fileName) {
        var romDir = `${config.baseOutputDir}/${config.romFileDir}/${romInfo.consoleName}`;
        var outputPath = `${romDir}/${fileName}`;

        return createWriteStream(romDir, outputPath);
    }
    ////TODO determine file extensions ahead of time?
    //var romDir = `${config.baseOutputDir}/${config.romFileDir}/${romInfo.consoleName}`;
    //var outputPath = `${romDir}/${romInfo.title}.zip`;

    return download(downloadUrl, writeStreamFactory, onProgress)
    //
    //return createWriteStream(romDir, outputPath)
    //.then((stream) => download(downloadUrl, stream, onProgress))
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