var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('../fileService/alucardService/alucardDownloadService');
var reporter = require('../fileService/alucardService/serviceActivityReporter');
var port = require('../common/config').servicePort;

app.use(bodyParser.json());

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

app.listen(port, () => console.log(`Alucard Service launched and listening on port ${port}`));

