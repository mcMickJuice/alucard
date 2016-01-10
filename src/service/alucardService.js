var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('./alucardDownloadService');
var port = process.env.PORT || 666;
var alucardLogger = require('../logging/alucardLogger');

app.use(bodyParser.json());

app.post('/download', function(req, res) {
    var body = req.body;
    var romId = body.romId;

    if(!romId){
        var resp = {
            message: 'No RomId included in request'
        }
        res.status(400).send(resp)
        return;
    }

    function onSuccess(uuid){
        var resp = {
            uuid: uuid,
            message: `download started for uuid ${uuid}`
        }
        res.status(202).send(resp);
    }

    function onError(msg){
        var error = new Error(`Error queueing download: ${msg}`);
        alucardLogger.error(error);
        res.send(msg);
    }

    downloadService.queueDownload(romId, onSuccess, onError);
});

app.listen(port);