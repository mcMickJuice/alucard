// var express = require('express');
// var app = express();
// var path = require('path');
// var http = require('http');
// var socketio = require('socket.io');
// var bodyParser = require('body-parser');
// var {webPort, servicePort, hostAddress} = require('../common/config');
// var alucardLogger = require('../common/logging/alucardLogger');
// var romSearchService = require('../web/webAppServices/romSearchService');
// var jobService = require('../web/webAppServices/jobService');
// var {postRequest} = require('../common/webService/webClient');
// var serviceMessageTypes = require('../common/enums/serviceMessageTypes');
// var progressType = require('../common/enums/progressTypes');
// var piStatusTypes = require('../common/enums/piStatusTypes');
// var {pingPi} = require('../fileService/fileTransfer/piMonitor');

// app.use(bodyParser.json());
// app.use(express.static(path.resolve(__dirname, './public')));
// var server = http.createServer(app);
// var io = socketio(server);


// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('something broke!!!');
// });

// io.on('connection', function (socket) {
//     console.log('socket connection made');

//     socket.emit('server ready');
// });

// app.get('/', function (req, res) {
//     res.send();
// });

// app.get('/health', function (req, res) {
//     var obj = {
//         status: 'Healthy'
//     };
//     res.status(200).send(obj);
// });

// app.post('/download', function (req, res) {
//     var address = `${hostAddress}:${servicePort}/download`;
//     var romId = req.body.romId;
//     var options = {
//         url: address,
//         body: { romId }
//     };

//     postRequest(options)
//         .then(() => res.status(202).send())
//         .catch(response => {
//             res.status(500).send(response)
//         })
// });

// app.post('/search', function (req, res) {
//     var {searchCriteria} = req.body;
//     romSearchService.searchRoms(searchCriteria)
//         .then(roms => {
//             res.send({ results: roms });
//         })
// });

// app.get('/jobs/current', function (req, res) {
//     jobService.getCurrentJobStates()
//         .then(jobs => {
//             res.status(200).send({ jobs })
//         })
// });

// app.get('/jobs', function (req, res) {
//     jobService.getAllJobStates()
//         .then(jobs => {
//             res.status(200).send({ jobs });
//         })
// });

// app.get('/jobs/detail/:id', function (req, res) {
//     var id = req.params.id;

//     jobService.getJobDetail(id)
//         .then(detail => {
//             res.status(200).send({ detail });
//         })
// });

// //service update endpoint
// app.post('/download/progress', function (req, res) {
//     var progressInfo = req.body.progressInfo;
//     //jobId/uuid, progressType (phase Change, download Update, transfer Update)

//     if (progressInfo.progressType === progressType.STATE_CHANGE) {
//         io.emit(serviceMessageTypes.STATE_CHANGE, progressInfo);
//     } else if (progressInfo.progressType === progressType.TRANSFER_PROGRESS) {
//         io.emit(serviceMessageTypes.FILE_PROGRESS, progressInfo)
//     } else {
//         //unknown progress type, bad service!
//         res.status(400).send({ error: 'unknown progress type!' });
//         return;
//     }

//     res.status(202).send({ progressInfo });

// });

// app.post('/download/complete', function (req, res) {
//     var downloadInfo = req.body.downloadInfo;
//     //uuid, gameTitle, consoleName
//     res.status(202).send({ downloadInfo });
//     io.emit(serviceMessageTypes.COMPLETE, downloadInfo);
// });

// app.post('/download/error', function (req, res) {
//     var error = req.body.error;

//     res.status(202).send({ error });
//     io.emit(serviceMessageTypes.ERROR, error)
// });

// //TODO pull pinging Pi into separate file
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

var express = require('express');
var webAppRouter = require('../web/app')
var {webPort} = require('../common/config');
var bodyParser = require('body-parser');
var webpackMiddleware = require('../../webpack-middleware');
var path = require('path');

var app = express();

app.use(bodyParser.json());
var staticPath = path.resolve(__dirname, '../web/static');
console.log(staticPath);
app.use(express.static(staticPath))



if(process.env.NODE_ENV === 'development') {
    //use webpack hot

    //
    console.log('webpack middleware')
    webpackMiddleware(app);
app.use('/*', webAppRouter);
    
} else {
    app.use('/alucard', webAppRouter)
}

app.get('/', (req, res) => {
    var indexPath = path.resolve(__dirname,'../web/index.html');
    console.log('request to index', req.path)
    res.sendFile(indexPath)
})

//mount on alucard route for hosting

app.listen(webPort, () => console.log(`Web app listening on ${webPort}`));