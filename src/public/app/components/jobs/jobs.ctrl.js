function JobsController(jobStoreService) {
    var vm = this;
    vm.jobs = jobStoreService.getJobs();
}

module.exports = JobsController;