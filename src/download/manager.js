var config = require('../secrets/config');
var consoleDirMapping = require('./consoleDirMapping').directoryMapping;
var download = require('../web/webDataProvider').downloadGame;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectoryPromise;
var fs = require('fs');
var _ = require('lodash');

function downloadGame(downloadUrl, romInfo) {
    //determine download path
    var consolePathName = _.find(consoleDirMapping, dirInfo => {
       return dirInfo.consoleName === romInfo.consoleName;
    }).directoryName;

    if(!consolePathName) {
        throw new Error(`console Path Name not found for ${romInfo.console}`);
    }
    //TODO determine file extensions ahead of time?
    var romDir = `${config.baseOutputDir}/${config.romFileDir}/${consolePathName}`;
    var outputPath = `${romDir}/${romInfo.title}.zip`;

    //TODO define reporter
    return createWriteStream(romDir, outputPath,(str, chunk) => {
        console.log(str, chunk);
    } )
    .then((stream) => download(downloadUrl, stream));
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

module.exports = downloadGame;