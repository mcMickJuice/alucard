var fs = require('fs');
var path = require('path');
var levels = require('./logConfig').levels;
var {ensureDirectory} = require('../utility/fileSystemHelpers');

function errLog(err) {
    console.log(err);
    console.log(err.stack)
}

function log(message, level){
    // var logPath = path.join(baseOutputDir, logFileDir);
    var logPath = process.cwd();
    ensureDirectory(logPath, err => {
        if(err) {
            errLog(err);
        }
        var env = process.env.NODE_ENV || 'development';
        var filePath = path.join(logPath, `log-${env}.txt`);

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