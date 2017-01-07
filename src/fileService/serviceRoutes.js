var express = require('express');
var downloadService = require('./alucardService/alucardDownloadService');
var reporter = require('./alucardService/serviceActivityReporter');

var router = express.Router();

router.get('/health', function(req, res) {
    res.status(200).send({status: 'everything Ok!'});
})

router.post('/download', function(req, res) {
    var romId = req.body.romId;

    if(!romId){
        var resp = {
            message: 'No RomId included in request'
        };
        res.status(400).send(resp);
        return;
    }

    process.nextTick(() => {
        downloadService.queueDownload(romId
        , reporter.onDownloadFinish
        , reporter.onProgress
        , reporter.onError)
    });

    res.status(202).send(resp);

});

module.exports = router;
