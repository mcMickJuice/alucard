var keyGen = require('./utility/keyGenerator');
var Rom = require('./models/Rom');
var jobStateManager = require('./logging/jobStateManager');
var logger = require('./logging/alucardLogger');
var webDataProvider = require('./web/webDataProvider');
var Q = require('q');

function queueDownload(romId) {
    var uuid = keyGen();
    Rom.findById(romId)
        .then(rom => {
            console.log('romFound',rom);
            var downloadPromise = webDataProvider.getDownloadLink(rom.url);
            var statePromise = jobStateManager.initializeJob(uuid,rom.title,rom._id);

            return Q.all([downloadPromise, statePromise]);
        })
        .then((dlLink) => {
            var writeStream
        })
        .then()
    //var uuid = keyGen();
    ////TODO PHASE INITIAL PHASE
    //get rom information

    //get downloadLink

    //TODO PHASE DOWNLOAD

    //TODO PHASE TRANSFER

    //TODO PHASE POSTTRANSFER
}


module.exports = {
    queueDownload
};