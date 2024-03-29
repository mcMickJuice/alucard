var express = require('express');
// var app = express();
// var path = require('path');
// var http = require('http');
// var socketio = require('socket.io');
var {servicePort, hostAddress} = require('./config');
// var alucardLogger = require('alucard-common/logging/alucardLogger');
var romSearchService = require('./webAppServices/romSearchService');
var jobService = require('./webAppServices/jobService');
var {postRequest} = require('alucard-common/webService/webClient');
// var serviceMessageTypes = require('alucard-common/enums/serviceMessageTypes');
// var progressType = require('alucard-common/enums/progressTypes');
// var piStatusTypes = require('alucard-common/enums/piStatusTypes');
// var {pingPi} = require('../fileService/fileTransfer/piMonitor');

// var server = http.createServer(app);
// var io = socketio(server);


// io.on('connection', function (socket) {
//     console.log('socket connection made');

//     socket.emit('server ready');
// });

var router = express.Router();

router.get('/health', function (req, res) {
    var obj = {
        status: 'Healthy'
    };
    res.status(200).send(obj);
});

router.post('/download', function (req, res) {
    var address = `${hostAddress}:${servicePort}/download`;
    var romId = req.body.romId;
    var options = {
        url: address,
        body: { romId }
    };

    postRequest(options)
        .then(() => res.status(202).send())
        .catch(response => {
            res.status(500).send(response)
        })
});

router.post('/search', function (req, res) {
    var {searchCriteria} = req.body;
    romSearchService.searchRoms(searchCriteria)
        .then(roms => {
            res.send({ results: roms });
        })
});

router.get('/jobs/current', function (req, res) {
    jobService.getCurrentJobStates()
        .then(jobs => {
            res.status(200).send({ jobs })
        })
});

router.get('/jobs', function (req, res) {
    jobService.getAllJobStates()
        .then(jobs => {
            res.status(200).send({ jobs });
        })
});

router.get('/jobs/detail/:id', function (req, res) {
    var id = req.params.id;

    jobService.getJobDetail(id)
        .then(detail => {
            res.status(200).send({ detail });
        })
});

//service update endpoint
router.post('/download/progress', function (req, res) {
    var progressInfo = req.body.progressInfo;
    console.log('progress', progressInfo)
    //jobId/uuid, progressType (phase Change, download Update, transfer Update)

    // if (progressInfo.progressType === progressType.STATE_CHANGE) {
    //     io.emit(serviceMessageTypes.STATE_CHANGE, progressInfo);
    // } else if (progressInfo.progressType === progressType.TRANSFER_PROGRESS) {
    //     io.emit(serviceMessageTypes.FILE_PROGRESS, progressInfo)
    // } else {
    //     //unknown progress type, bad service!
    //     res.status(400).send({ error: 'unknown progress type!' });
    //     return;
    // }

    res.status(202).send({ progressInfo });

});

router.post('/download/complete', function (req, res) {
    var downloadInfo = req.body.downloadInfo;
    console.log('complete', downloadInfo)
    
    //uuid, gameTitle, consoleName
    res.status(202).send({ downloadInfo });
    // io.emit(serviceMessageTypes.COMPLETE, downloadInfo);
});

router.post('/download/error', function (req, res) {
    var error = req.body.error;
    console.log('error', error)
    

    res.status(202).send({ error });
    // io.emit(serviceMessageTypes.ERROR, error)
});

//TODO pull pinging Pi into separate file
// function pingPiAndReport() {
//     return pingPi()
//         .then(isPiActive => {
//             io.emit(piStatusTypes.PING_STATUS, { isPiActive })
//             setTimeout(pingPiAndReport, 10000);
//         })
//         .catch(err => {
//             console.log('error with pi', err)
//         })
// }

// server.listen(webPort, function () {
//     var message = `Alucard Web App launched and listening on port ${webPort}`
//     console.log(message);
//     alucardLogger.info(message)
//     pingPiAndReport();
// });

module.exports = router;