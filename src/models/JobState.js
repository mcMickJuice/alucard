var mongoose = require('./mongoosePromisified');

var Schema = mongoose.Schema;

var jobStateSchema = new Schema({
    uuid: Number,
    phase: String,
    time: {type: Date, default: Date.now()},
    isCompleted: {type: Boolean, default: false},
    errorDetail: {
        lastPhase: String,
        reason: String
    }
});

var JobState = mongoose.model('jobState', jobStateSchema);

module.exports = JobState;