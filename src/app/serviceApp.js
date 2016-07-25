var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('../fileService/alucardService/alucardDownloadService');
var reporter = require('../fileService/alucardService/serviceActivityReporter');
var port = require('../common/config').servicePort;
var {pingPi} = require('../fileService/fileTransfer/piMonitor')

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
    console.log(err.stack);

    next();
})

app.get('/health', function (req, res) {
    res.status(200).send({ status: 'everything Ok!' });
})

app.post('/download', function (req, res) {
    var romId = req.body.romId;

    if (!romId) {
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

app.get('/ping', function (req, res) {
    pingPi()
        .then(isPiAlive => {
            var body = {
                isUp: isPiAlive
            }

            return body
        })
        .catch(() => {
            var body = {
                isUp: false
            }

            return body
        })
        .then(body => {
            console.log('ive been pinged!', body)

            res.body = body;
            res.end();
        })
})

app.listen(port, () => console.log(`Alucard Service launched and listening on port ${port}`));

