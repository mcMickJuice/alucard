var mongoose = require('mongoose');
var {Promise} = require('q');
var {dbConfig: {dbAddress, dbName}} = require('../../common/config');

mongoose.Promise = Promise;
//TODO only connect on construction of model
//FIXME this opens up a connection immediately when imported.
mongoose.connect(`${dbAddress}${dbName}`);

module.exports = mongoose;