var Job = require('../models/JobState');
var moment = require('moment');

var timeWindow = moment().startOf('day').add(-1, 'days');
//var StringifyStream = require('../utility/stringifyStream');


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
//
//function getAllJobStatesStream() {
//TODO find out how to do this...or if I need to
//    return Job.find()
//        .select(jobStateProjection)
//        .stream()
//        //.pipe(StringifyStream()); //include here or in calling code?
//}


function getAllJobStates() {
    return Job.find()
        .select(jobStateProjection)
        .exec()
}

module.exports = {
    getCurrentJobStates,
    getAllJobStates
};
