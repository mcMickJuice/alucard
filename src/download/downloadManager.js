var config = require('../secrets/config');
var download = require('../webService/webDataProvider').downloadGame;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');
var onProgress = require('../alucardService/serviceActivityReporter').onProgress;

function downloadGame(downloadUrl, romInfo) {
    //TODO determine file extensions ahead of time?
    var romDir = `${config.baseOutputDir}/${config.romFileDir}/${romInfo.consoleName}`;
    var outputPath = `${romDir}/${romInfo.title}.zip`;

    return createWriteStream(romDir, outputPath)
    .then((stream) => download(downloadUrl, stream, onProgress))
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