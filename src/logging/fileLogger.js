var fs = require('fs');
var config = require('../secrets/config');
var path = require('path');
var mkdir = require('mkdirp');
var levels = require('./logConfig').levels;

function verifyOrCreateLogDir(directory,cb) {
    mkdir(directory, cb);
}

function errLog(err) {
    console.log(err);
    console.log(err.stack)
}

function log(message, level){
    //var dirPath = path.resolve(logFileDir);
    var logPath = `${config.baseOutputDir}/${logFileDir}`;
    verifyOrCreateLogDir(logPath, err => {
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