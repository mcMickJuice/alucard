var mongoose = require('./mongoosePromisified');

var Schema = mongoose.Schema;

var jobStateSchema = new Schema({
    uuid: {type: String, required: true},
    phase: {type: String, required: true},
    gameTitle: {type: String, required: true},
    gameId: {type: Schema.Types.ObjectId, required:true},
    time: {type: Date, default: Date.now()},
    isCompleted: {type: Boolean, default: false},
    errorDetail: {
        lastPhase: String,
        reason: String
    }
});

var JobState = mongoose.model('jobState', jobStateSchema);

module.exports = JobState;