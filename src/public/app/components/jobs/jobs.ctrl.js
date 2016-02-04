function JobsController(jobStoreService) {
    var vm = this;
    vm.jobs = jobStoreService.getJobs();

    vm.getDetail = function(id) {
        jobStoreService.getJobStateDetail(id)
            .then(detail => {
                vm.detail = detail;
            })
    };

    vm.dismissDetail = function() {
        vm.detail = null;
    }
}

module.exports = JobsController;