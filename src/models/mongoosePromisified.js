var mongoose = require('mongoose');
var Promise = require('q').Promise;

mongoose.Promise = Promise;

module.exports = mongoose;