var serviceMessageTypes = require('../../../../enums/serviceMessageTypes');
var _ = require('lodash');

function JobsController(jobService) {
    var vm = this;
    vm.jobs = [];
    vm.jobRequestInFlight = true;

    jobService.getRecentJobs()
        .then(jobs => {
            vm.jobs = jobs;
            vm.jobRequestInFlight = false;
        })
        .catch(err => {
            console.log(err);
            vm.jobRequestInFlight = false;
        });

    //socketService.on(serviceMessageTypes.PROGRESS, function(progressInfo) {
    //    var job = _.find(vm.jobs, job => {
    //        return job.uuid === progressInfo.uuid;
    //    });
    //
    //    console.log(job);
    //});
}

module.exports = JobsController;