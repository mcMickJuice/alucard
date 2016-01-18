var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('./../alucardService/alucardDownloadService');
var reporter = require('../alucardService/serviceActivityReporter');
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

app.listen(port, () => console.log(`Alucard Service listening at port ${port}`));

