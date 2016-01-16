var keyGen = require('./../utility/keyGenerator');
var Rom = require('./../models/Rom');
var jobStateManager = require('./../logging/jobStateManager');
var webDataProvider = require('../webService/webDataProvider');
var downloadGame = require('./../download/downloadManager').downloadGame;
var romHost = require('./../secrets/romRequestConfig').romHost;
var Q = require('q');
var fileProcessor = require('./../fileProcessing/fileProcessManager');
var fileTransferManager = require('./../fileTransfer/fileTransferManager');

function queueDownload(romId, onRetrieval, onError) {
    var uuid = keyGen();
    return Rom.findById(romId)
        .then(rom => {

            if(!rom){
                var reason = `Rom not found for id ${romId}`
                onError(reason);
                return Q.reject(reason);
            } else {
                onRetrieval(uuid);
            }
            //Get download link for game
            var fullDlLink = `${romHost}${rom.url}`;

            var downloadPromise = webDataProvider.getDownloadLink(fullDlLink);
            var statePromise = jobStateManager.initializeJob(uuid,rom.title,rom._id);

            return Q.all([downloadPromise, Q.when(rom._doc) ,statePromise]);
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

            return Q.all([Q.when(consoleName), processFilePromise, jobStatePromise]);
        })
        .spread((consoleName, processedFilePaths)=> {
            //TODO PHASE TRANSFER
            var jobStatePromise = jobStateManager.transfer(uuid);
            //perform in parallel
            var tasks = processedFilePaths.map(p => {
                return fileTransferManager.moveFileToPi(p, consoleName);
            });

            tasks.push(jobStatePromise);

            return Q.all(tasks);
        })
        .then(() => {
            //TODO POSTPROCESS
            return;
        })
        .then(() => {
            return jobStateManager.complete(uuid);
        })
        .catch(err => {
            jobStateManager.error(err, uuid);
            throw err;
        });
}

//queueDownload('569154f399784608393116fe')
//.then(() => console.log('download complete'));

module.exports = {
    queueDownload
};