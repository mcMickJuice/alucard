var keyGen = require('./utility/keyGenerator');
var Rom = require('./models/Rom');
var jobStateManager = require('./logging/jobStateManager');
//var logger = require('./logging/alucardLogger');
var webDataProvider = require('./web/webDataProvider');
var downloadGame = require('./download/downloadManager').downloadGame;
var romHost = require('./secrets/romRequestConfig').romHost;
var Q = require('q');

function queueDownload(romId) {
    var uuid = keyGen();
    return Rom.findById(romId)
        .then(rom => {
            var fullDlLink = `${romHost}${rom.url}`;

            var downloadPromise = webDataProvider.getDownloadLink(fullDlLink);
            var statePromise = jobStateManager.initializeJob(uuid,rom.title,rom._id);

            return Q.all([downloadPromise, Q.when(rom._doc) ,statePromise]);
        })
        .spread((dlLink, romInfo) => {
            //TODO move into service
            var fullDlLink = `${romHost}${dlLink}`;
            return downloadGame(fullDlLink, romInfo);
        })
        .then(() => {
            jobStateManager.fileProcessing(uuid);
            console.log('rom downloaded successfully');
        })
    .catch(err => {
        jobStateManager.error(err, uuid);
        console.log(err.stack);
    });
    //var uuid = keyGen();
    ////TODO PHASE INITIAL PHASE
    //get rom information

    //get downloadLink

    //TODO PHASE DOWNLOAD

    //TODO PHASE TRANSFER

    //TODO PHASE POSTTRANSFER
}

queueDownload('569154f49978460839311f5f')
.then(() => console.log('download complete'));

//module.exports = {
//    queueDownload
//};