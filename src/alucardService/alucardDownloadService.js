var keyGen = require('./../utility/keyGenerator');
var Rom = require('./../models/Rom');
var jobStateManager = require('./../logging/jobStateManager');
var webDataProvider = require('../webService/webDataProvider');
var downloadGame = require('./../download/downloadManager').downloadGame;
var romHost = require('./../secrets/romRequestConfig').romHost;
var Q = require('q');
var fileProcessor = require('./../fileProcessing/fileProcessManager');
var fileTransferManager = require('./../fileTransfer/fileTransferManager');
var stateChange = require('../enums/progressType').STAGE_CHANGE;
var phase = require('../enums/filePhaseType');

function queueDownload(romId, onFinish, onProgress, onError) {
    var uuid = keyGen();
    var downloadInfo = {
        uuid: uuid
    };
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
            var progressPromise = onProgress({uuid, progressType: stateChange, changeInfo: {newState: phase.DOWNLOADING}});

            return Q.all([downloadPromise, Q.when(rom._doc) ,statePromise, progressPromise]);
        })
        .spread((dlLink, romInfo) => {
            //download game
            //TODO move into alucardService
            var fullDlLink = `${romHost}${dlLink}`;
            return downloadGame(fullDlLink, romInfo);
        })
        .then(downloadedFileInfo => {
            //process file
            var jobStatePromise = jobStateManager.fileProcessing(uuid);
            var filePath = downloadedFileInfo.filePath;
            var consoleName = downloadedFileInfo.rom.consoleName;
            var processFilePromise = fileProcessor(filePath, consoleName);
            var progressPromise = onProgress({uuid, progressType: stateChange, changeInfo: {newState: phase.FILE_PROCESSING}});

            return Q.all([Q.when(consoleName), processFilePromise, jobStatePromise, progressPromise]);
        })
        .spread((consoleName, processedFilePaths)=> {
            var jobStatePromise = jobStateManager.TRANSFER(uuid);
            var progressPromise = onProgress({uuid, progressType: stateChange, changeInfo: {newState: phase.TRANSFER}});

            //perform in parallel
            var tasks = processedFilePaths.map(p => {
                return fileTransferManager.moveFileToPi(p, consoleName);
            });

            tasks.push(jobStatePromise);
            tasks.push(progressPromise);
            return Q.all(tasks);
        })
        .then(() => {
            var jobStatePromise = jobStateManager.complete(uuid);
            var progressPromise = onProgress({uuid, progressType: stateChange, changeInfo: {newState: phase.COMPLETE}});
            var finishPromise = onFinish(downloadInfo);

            return Q.all([jobStatePromise, progressPromise, finishPromise]);
        })
        .catch(err => {
            jobStateManager.error(err, uuid);
            //FIXME clone this?
            downloadInfo.error = err.message;
            return onError(downloadInfo);
        });
}

//queueDownload('569154f399784608393116fe')
//.then(() => console.log('download complete'));

module.exports = {
    queueDownload
};