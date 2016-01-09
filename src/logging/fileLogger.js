var fs = require('fs');
var config = require('../secrets/config');
var path = require('path');
var levels = require('./logConfig').levels;
var ensureDirectory = require('../utility/fileSystemHelpers').ensureDirectory;

function errLog(err) {
    console.log(err);
    console.log(err.stack)
}

function log(message, level){
    var logPath = `${config.baseOutputDir}/${config.logFileDir}`;
    ensureDirectory(logPath, err => {
        if(err) {
            errLog(err);
        }
        var env = process.env.NODE_ENV;
        var filePath = path.resolve(logPath, `log-${env}.txt`);

        message = `${level} - ${Date()}: ${message}\r\n`;
        fs.appendFile(filePath,message, 'utf8', function(err) {
            if(err) {
                errLog(err);
            }
        });
    })
}

function error(err) {
    var message = `${err}\r\n${err.stack}`;
    log(message, levels.error);
}

function info(message) {
    log(message, levels.info);
}

function warn(message) {
    log(message, levels.debug);
}

module.exports = {
    error,
    info,
    warn
};