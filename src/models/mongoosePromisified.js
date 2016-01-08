var mongoose = require('mongoose');
var Promise = require('q').Promise;
var dbConfig = require('../secrets/dbConfig');

var {dbAddress, dbName} = dbConfig;
mongoose.Promise = Promise;
mongoose.connect(`${dbAddress}${dbName}`);

module.exports = mongoose;