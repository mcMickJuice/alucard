var app = require('express')();
var bodyParser = require('body-parser');
var downloadService = require('./alucardDownloadService');
//exposed port to queuing up download

app.use(bodyParser.json());

app.post('/download', function(req, res) {
    var body = req.body;
    console.log(body);
    var romId = body.romId;

    function onSuccess(rom){
        res.send('download started for ' + rom.title);
    }

    function onError(msg){
        res.send(msg);
    }

    downloadService.queueDownload(romId, onSuccess, onError)
    .catch(err => {
        console.log(err.stack);
        res.send('there was an error downloading your file!');
    });
});

app.listen(666);