var stream = require('stream');
var util = require('util');


//https://github.com/felixge/node-mysql/issues/741

function StringifyStream(options) {
    //account for if new is not used
    if(!(this instanceof StringifyStream)){
        return new StringifyStream(options);
    }

    options = options || {};
    options.objectMode = true;

    stream.Transform.call(this, options);
}

util.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype._transform = function(d, e, callback) {
    //FIXME this doesnt work. It needs to break it up into an array of objects
    this.push(JSON.stringify(d));
    callback();
};

module.exports = StringifyStream;