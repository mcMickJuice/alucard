var Log = require('../models/Log');
var levels = require('./logConfig').levels;

function logMessage(message, level) {
    var log = new Log({
        message, level
    });

    return log.save();
}

function error(err) {
    var message = err.stack;
    var log = new Log({
        message: message,
        level: levels.error
    });

    return log.save();
}

function info(message) {
    return logMessage(message, levels.info);
}

function warn(message) {
    return logMessage(message, levels.warn);
}

function debug(message) {
    return logMessage(message, levels.debug);
}

module.exports = {
    error,
    info,
    warn,
    debug
}