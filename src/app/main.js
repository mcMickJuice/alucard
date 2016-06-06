var app = require('./webApp.js');
var {webPort} = require('../common/config')

app.startServer(webPort);