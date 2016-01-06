var fs = require('fs');
var logFileDir = require('../secrets/config').logFileDir;
var path = require('path')
var mkdir = require('mkdirp');

function verifyOrCreateLogDir(directory,cb) {
    mkdir(directory, cb);
}

var levels = {
    "error": "ERROR",
    "info": "INFO",
    "debug": "DEBUG"
}

function errLog(err) {
    console.log(err)
    console.log(err.stack)
}

function log(message, level){
    //var dirPath = path.resolve(logFileDir);

    verifyOrCreateLogDir(logFileDir, err => {
        if(err) {
            errLog(err);
        }
        var env = process.env.NODE_ENV;
        var filePath = path.resolve(logFileDir, `log-${env}.txt`);

        message = `${level} - ${Date()}: ${message}\r\n`;
        fs.appendFile(filePath,message, 'utf8', function(err) {
            if(err) {
                errLog(err);
                return;
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