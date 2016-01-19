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
            createdTime: {
                $gte: timeWindow.toDate()
            }
        })
        .select(jobStateProjection)
        .exec();
}


function getAllJobStates() {
    return Job.find()
        .select(jobStateProjection)
        .exec()
}

module.exports = {
    getCurrentJobStates,
    getAllJobStates
};
