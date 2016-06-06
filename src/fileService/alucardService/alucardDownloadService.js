var keyGen = require('./../utility/keyGenerator');
var Rom = require('././Rom');
var jobStateManager = require('././jobStateManager');
var webDataProvider = require('./webDataProvider');
var downloadGame = require('././downloadManager').downloadGame;
var romHost = require('./../secrets/romRequestConfig').romHost;
var Q = require('q');
var fileProcessor = require('././fileProcessManager');
var fileTransferManager = require('././fileTransferManager');
var progressTypes  = require('./progressTypes');
var phase = require('./filePhaseType');

var stateChange = progressTypes.STATE_CHANGE;
var fileProcess = progressTypes.TRANSFER_PROGRESS;

function queueDownload(romId, onFinish, onProgress, onError) {
    var uuid = keyGen();
    var downloadInfo = {
        uuid: uuid
    };

    var fileProgressReporter = function(progressObj) {
        onProgress({uuid, progressType: fileProcess, progress: progressObj});
    }

    return Rom.findById(romId)
        .then(rom => {

            if(!rom){
                var reason = `Rom not found for id ${romId}`;
                onError(reason);
                return Q.reject(reason);
            }
            downloadInfo.title = rom.title;
            downloadInfo.consoleName = rom.consoleName;
            //Get download link for game
            var fullDlLink = `${romHost}${rom.url}`;

            var downloadPromise = webDataProvider.getDownloadLink(fullDlLink);
            var statePromise = jobStateManager.initializeJob(uuid,rom.title,rom._id);
            var progressPromise = onProgress({uuid, progressType: stateChange, newState: phase.DOWNLOADING});

            return Q.all([downloadPromise, Q.when(rom._doc) ,statePromise, progressPromise]);
        })
        .spread((dlLink, romInfo) => {
            //download game
            //TODO move into alucardService
            var fullDlLink = `${romHost}${dlLink}`;
            return downloadGame(fullDlLink, romInfo, fileProgressReporter);
        })
        .then(downloadedFileInfo => {
            //process file
            var jobStatePromise = jobStateManager.fileProcessing(uuid);
            var filePath = downloadedFileInfo.filePath;
            var consoleName = downloadedFileInfo.rom.consoleName;
            var processFilePromise = fileProcessor(filePath, consoleName);
            var progressPromise = onProgress({uuid, progressType: stateChange, newState: phase.FILE_PROCESSING});

            return Q.all([Q.when(consoleName), processFilePromise, jobStatePromise, progressPromise]);
        })
        .spread((consoleName, processedFilePaths)=> {
            var jobStatePromise = jobStateManager.transfer(uuid);
            var progressPromise = onProgress({uuid, progressType: stateChange, newState: phase.FILE_TRANSFER});

            //perform in parallel
            var tasks = processedFilePaths.map(p => {
                return fileTransferManager.moveFileToPi(p, consoleName, fileProgressReporter);
            });

            tasks.push(jobStatePromise);
            tasks.push(progressPromise);
            return Q.all(tasks);
        })
        .then(() => {
            var jobStatePromise = jobStateManager.complete(uuid);
            var progressPromise = onProgress({uuid, progressType: stateChange, newState: phase.COMPLETE});
            var finishPromise = onFinish(downloadInfo);

            return Q.all([jobStatePromise, progressPromise, finishPromise]);
        })
        .catch(err => {
            jobStateManager.error(err, uuid);
            //FIXME clone this?
            downloadInfo.error = err.message;

            var errorPromise = onError(downloadInfo);
            var progressPromise = onProgress({uuid, progressType: stateChange, newState: phase.ERROR});

            return Q.all([errorPromise, progressPromise]);
        });
}

module.exports = {
    queueDownload
};