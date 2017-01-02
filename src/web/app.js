var express = require('express');
var apiRouter = require('./apiRoutes')
var {webPort} = require('../common/config');
var bodyParser = require('body-parser');
var webpackMiddleware = require('../../webpack-middleware');
var path = require('path');
var mountPath = process.env.MOUNT_PATH //come from config

var app = express();

app.use(bodyParser.json());
var staticPath = path.resolve(__dirname, './static');
console.log(staticPath);
app.use(express.static(staticPath))

if(process.env.NODE_ENV === 'development') {
    webpackMiddleware(app);
} 

app.set('views', path.resolve(__dirname,'./views'));
app.set('view engine', 'pug');

var apiMouthPath = mountPath || '';
app.use(apiMouthPath + '/api', apiRouter)

app.get(mountPath || '/', (req, res) => {
    // var indexPath = path.resolve(__dirname,'../web/index.html');
    // res.sendFile(indexPath)
    res.render('index', {baseUrl: apiMouthPath})
})

app.listen(webPort, () => console.log(`Web app listening on ${webPort} for mountPath ${mountPath || '/'}`));