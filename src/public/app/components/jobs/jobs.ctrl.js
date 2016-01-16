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
        })
}

module.exports = JobsController;