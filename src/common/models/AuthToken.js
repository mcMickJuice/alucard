var mongoose = require('./mongoosePromisified');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    token: String,
    createDate: {time: Date, default: Date.now}
});

var AuthToken = mongoose.model('authToken', tokenSchema);

module.exports = AuthToken;
