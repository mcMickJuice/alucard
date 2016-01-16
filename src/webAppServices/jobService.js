var Job = require('../models/JobState');
var moment = require('moment');

var timeWindow = moment().startOf('day').add(-1, 'days');
var StringifyStream = require('../utility/stringifyStream');


var jobStateProjection = {
    uuid: 1,
    gameTitle: 1,
    phase: 1,
    isCompleted: 1
};

function getCurrentJobStates() {
    return Job.find({
            time: {
                $gte: timeWindow.toDate()
            }
        })
        //.where('time').gt()
        .select(jobStateProjection)
        .exec();
}

function getAllJobStatesStream() {
    return Job.find()
        .select(jobStateProjection)
        .stream()
        .pipe(StringifyStream()); //include here or in calling code?
}

module.exports = {
    getCurrentJobStates,
    getAllJobStatesStream
};
