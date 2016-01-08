var mongoose = require('./mongoosePromisified');
var dbConfig = require('../secrets/dbConfig');

var {dbAddress, dbName} = dbConfig;

var Schema = mongoose.Schema;
mongoose.connect(`${dbAddress}${dbName}`);

var logSchema = new Schema({
    message: String,
    level: String,
    time: {type: Date, default: Date.now}
});

var Log = mongoose.model('log', logSchema);

module.exports = Log;