var JobState = require('../models/JobState');
var logger = require('../logging/alucardLogger');
var Q = require('q');

var phase = {
    downloading: 'DOWNLOADING',
    fileProcessing: 'FILE_PROCESSING',
    transfer: 'FILE_TRANSER',
    complete: 'COMPLETE',
    error: 'ERROR'
};

function updateJob(uuid, updateObj) {
    updateObj.time = Date.now();
    return JobState.update({uuid: uuid}, updateObj);
}

function guardUuid(uuid) {
    var deferred = Q.defer();

    if(!uuid) {
        deferred.reject(new Error(`UUID not present in update JobState - ${uuid} (probably undefined)`));
    } else {
        deferred.resolve();
    }

    return deferred.promise;
}


//while processing file, update status of job
function initializeJob(uuid, gameTitle, gameId) {

    return guardUuid(uuid)
    .then(() => {
        var job = new JobState({
            uuid,
            phase: phase.downloading,
            gameTitle,
            gameId
        });

        return job.save();
    })
    .then(() => {
        logger.info(`Job ${uuid} set to downloading`);
    });
}

function fileProcessing(uuid) {
    return guardUuid(uuid)
        .then(() => {
            var updateObj = {
                phase: phase.fileProcessing
            };

            return updateJob(uuid,updateObj);
        })
        .then(() => {
            logger.info(`Job ${uuid} set to fileProcessing`)
        });
}

function transfer(uuid) {
    return guardUuid(uuid)
        .then(() => {
            var updateObj = {
                phase: phase.transfer
            };

            return updateJob(uuid, updateObj);
        })
        .then(() => {
            logger.info(`Job ${uuid} set to file transfer`);
        });
}

function complete(uuid) {
    return guardUuid(uuid)
        .then(() => {
            var updateObj = {
                phase: phase.complete,
                isCompleted: true
            };

            return updateJob(uuid, updateObj);
        })
        .then(() => {
            logger.info(`Job ${uuid} has completed!`);
        })
}

function error(err, uuid) {
    return guardUuid(uuid)
        .then(() => {
            logger.warn(`Error related to Job ${uuid}`);
            logger.error(err);
            return JobState.findOne({uuid: uuid});
        })
        .then(job => {
            var oldPhase = job.phase.toString();

            job.time = Date.now();
            job.phase = phase.error;
            job.errorDetail = {
                lastPhase: oldPhase,
                reason: err.stack
            };

            return job.save();
        });
}

module.exports = {
    initializeJob,
    fileProcessing,
    transfer,
    complete,
    error
};
