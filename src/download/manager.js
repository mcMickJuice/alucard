var config = require('../secrets/config');
var consoleDirMapping = require('./consoleDirMapping').directoryMapping;
var downloadGame = require('../web/webDataProvider').downloadGame;
//var Q = require('q');
var fs = require('fs');
var _ = require('lodash');

function downloadGame(downloadUrl, romInfo) {
    //determine download path
    var consolePathName = _.find(consoleDirMapping, dirInfo => {
       return dirInfo.consoleName === romInfo.console;
    }).directoryName;

    if(!consolePathName) {
        throw new Error(`console Path Name not found for ${romInfo.console}`);
    }
    //TODO path not exist....check to make sure first...
    //TODO determine file extensions ahead of time?
    var outputPath = `${config.baseOutputDir}/${config.romFileDir}/${consolePathName}/${romInfo.title}.zip`;

    //create write stream
    //TODO define reporter
    //report progress?
    var writeStream = createWriteStreamWrapper(outputPath, (str, chunk) => {
        console.log(str, chunk);
    });

    return downloadGame(downloadUrl, writeStream);
}

function createWriteStreamWrapper(filePath, reporter) {
    //var deferred = Q.defer();

    var writeStream = fs.createWriteStream(filePath);
    writeStream.on('data', function(chunk) {
        if(reporter) {
            reporter('On Download Data',chunk);
        }
    });

    //writeStream.on('finish', function() {
    //    deferred.resolve();
    //});
    //
    //writeStream.on('error', function(err) {
    //    deferred.reject(err);
    //});

    return writeStream
}

module.exports = downloadGame;