var Job = require('./JobState');
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

function getJobDetail(id) {
    return Job.findOne({
        uuid: id
    })
    .exec();
}

module.exports = {
    getCurrentJobStates,
    getAllJobStates,
    getJobDetail
};
