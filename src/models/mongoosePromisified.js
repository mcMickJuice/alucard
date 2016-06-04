var mongoose = require('mongoose');
var Promise = require('q').Promise;
var {dbConfig: {dbAddress, dbName}} = require('../config');

mongoose.Promise = Promise;
//TODO only connect on construction of model
//FIXME this opens up a connection immediately when imported.
mongoose.connect(`${dbAddress}${dbName}`);

module.exports = mongoose;