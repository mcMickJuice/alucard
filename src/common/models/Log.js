var mongoose = require('./mongoosePromisified');

var Schema = mongoose.Schema;

var logSchema = new Schema({
    message: String,
    level: String,
    time: {type: Date, default: Date.now}
});

var Log = mongoose.model('log', logSchema);

module.exports = Log;