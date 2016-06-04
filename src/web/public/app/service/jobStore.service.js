var serviceMessageTypes = require('../.././serviceMessageTypes');
var _ = require('lodash');

function jobStore(socketService, $rootScope, jobService) {
    var currentJobs = [];

    function updateProgressMapper(progressInfo) {
        return function updateProgressImpl(job) {
            job.progress = progressInfo.progress;
        }
    }

    function changePhaseMapper(progressInfo) {
        return function changePhaseImpl(job) {
            job.phase = progressInfo.newState;
            //clear progress as if the next state needs it, it will append progress object
            job.progress = null;
        }
    }

    var throttledUpdateProgress = _.throttle(progressInfo => {
        var mapper = updateProgressMapper(progressInfo);

        mutateWithProgress(mapper, progressInfo.uuid);
    }, 1000);

    socketService.on(serviceMessageTypes.FILE_PROGRESS, throttledUpdateProgress);

    socketService.on(serviceMessageTypes.STATE_CHANGE, progressInfo => {
    //newState => phase
        var mapper = changePhaseMapper(progressInfo);
        mutateWithProgress(mapper, progressInfo.uuid);
    });

    function mutateWithProgress(mutateAction, uuid) {
        var job = _.find(currentJobs, job => {
            return job.uuid === uuid;
        });

        if(!job) return;

        mutateAction(job);
        $rootScope.$apply();
    }

    function fetchJobs() {
        return jobService.getRecentJobs()
            .then(jobs => {
                currentJobs = jobs
            });
    }

    function getJobs() {
        return currentJobs;
    }

    function getJobStateDetail(id) {
        return jobService.getJobStateDetail(id);
    }


    return {
        fetchJobs,
        getJobs,
        getJobStateDetail
    }
}

module.exports = jobStore
