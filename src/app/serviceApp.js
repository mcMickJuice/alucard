var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('./../alucardService/alucardDownloadService');
var port = require('../secrets/config').servicePort;
var alucardLogger = require('../logging/alucardLogger');

app.use(bodyParser.json());

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.header('Access-Control-Allow-Methods', 'GET PUT POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(function(err,req,res,next) {
    console.log(err.stack);

    next();
})

app.get('/health', function(req, res) {
    res.status(200).send({status: 'everything Ok!'});
})

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

app.listen(port, () => console.log(`Alucard Service listening at port ${port}`));

