var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = require('../secrets/config').webPort;
var alucardLogger = require('../logging/alucardLogger');
var romSearchService = require('../webAppServices/romSearchService');

app.use(bodyParser.json());

app.use(express.static('../public'));
//'authentication' step required

app.get('/', function(req, res) {
    res.send();
});

app.get('/test', function(req,res) {
    var obj = {
        resp: 'this is the response',
        num: 9
    }
    res.status(200).send(obj);
})

app.post('/search', function(req, res) {
    var {searchCriteria} = req.body;
    console.log(searchCriteria);
    romSearchService.searchRoms(searchCriteria)
        .then(roms => {
            res.send({results: roms});
        })
});
//
//app.post('/progress', function(req, res) {
//    var body = req.body;
//    res.status(202).send();
//});
//
//app.post('/complete', function(req, res) {
//    var body = req.body;
//    res.status(202).send();
//})

app.listen(port, function() {
    var message = `alucard web app launched and listening on port ${port}`
    console.log(message);
    alucardLogger.info(message)
});