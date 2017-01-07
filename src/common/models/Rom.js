var {mongoose} = require('./mongoosePromisified');

var Schema = mongoose.Schema;

var RomSchema = new Schema({
    title: {type:String, required: true},
    url: {type:String, required: true},
    consoleName: {type:String, required: true}
});

var Rom = mongoose.model('rom', RomSchema);

module.exports = Rom;