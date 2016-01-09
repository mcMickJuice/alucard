var config = require('../secrets/config');
var download = require('../web/webDataProvider').downloadGame;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');

function downloadGame(downloadUrl, romInfo) {
    //TODO determine file extensions ahead of time?
    var romDir = `${config.baseOutputDir}/${config.romFileDir}/${romInfo.consoleName}`;
    var outputPath = `${romDir}/${romInfo.title}.zip`;

    //TODO define reporter
    return createWriteStream(romDir, outputPath,(str, chunk) => {
        console.log(str, chunk);
    } )
    .then((stream) => download(downloadUrl, stream))
        .then(() => {
            return {
                rom: romInfo,
                filePath: outputPath
            }
        });
}

function createWriteStream(directory,filePath, reporter) {
    return ensureDirectory(directory)
        .then(() => {
            var writeStream = fs.createWriteStream(filePath);
            writeStream.on('data', function(chunk) {
                if(reporter) {
                    reporter('On Download Data',chunk);
                }
            });
            return writeStream;
        });
}

module.exports.downloadGame = downloadGame;