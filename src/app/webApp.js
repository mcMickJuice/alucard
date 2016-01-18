var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = require('../secrets/config').webPort;
var alucardLogger = require('../logging/alucardLogger');
var romSearchService = require('../webAppServices/romSearchService');
var jobService = require('../webAppServices/jobService');

app.use(bodyParser.json());

app.use(express.static('../public'));
//'authentication' step required

app.get('/', function (req, res) {
    res.send();
});

app.get('/health', function (req, res) {
    var obj = {
        status: 'Healthy'
    };
    res.status(200).send(obj);
})

app.post('/search', function (req, res) {
    var {searchCriteria} = req.body;
    console.log(searchCriteria);
    romSearchService.searchRoms(searchCriteria)
        .then(roms => {
            res.send({results: roms});
        })
});

app.get('/jobs/current', function (req, res) {
    jobService.getCurrentJobStates()
        .then(jobs => {
            res.status(200).send({jobs})
        })
});

app.get('/jobs', function (req, res) {
    jobService.getAllJobStates()
        .then(jobs => {
            res.status(200).send({jobs});
        })
});

//service update endpoint
app.post('/download/progress', function(req, res) {
    var progressInfo = req.body.progressInfo;
    //jobId/uuid, progressType (phase Change, download Update, transfer Update)
    res.status(202).send({progressInfo});
});

app.post('/download/complete', function(req, res) {
    var downloadInfo = req.body.downloadInfo;
    //uuid, gameTitle, consoleName
    res.status(202).send({downloadInfo});
});

app.post('/download/error', function(req, res) {
    var error = req.body.error;

    res.status(202).send({error});
})

app.listen(port, function () {
    var message = `alucard web app launched and listening on port ${port}`
    console.log(message);
    alucardLogger.info(message)
});