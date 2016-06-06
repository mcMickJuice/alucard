var fileLogger = require('./fileLogger');
var dbLogger = require('./dbLogger');

var loggers = [fileLogger, dbLogger];

//FIXME none of these log methods have a callback and therefore they are fire and forget?
//OR will they be synchronous? Doubtful...
function error(err) {
    loggers.forEach(l => l.error(err));
}

function info(message) {
    loggers.forEach(l => l.info(message));
}

function warn(message) {
    loggers.forEach(l => l.warn(message));
}

module.exports = {
    error,
    info,
    warn
}