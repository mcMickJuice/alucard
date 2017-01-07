var path = require('path');
var dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, './.env')});

var express = require('express');
var apiRouter = require('./apiRoutes')
var {port, dbAddress, dbName} = require('./config')
var bodyParser = require('body-parser');
var mongoose = require('alucard-common/models/mongoosePromisified');

mongoose.init(dbAddress, dbName);

var app = express();

app.use(bodyParser.json());
var staticPath = path.resolve(__dirname, './static');
app.use(express.static(staticPath))

if(process.env.NODE_ENV === 'development') {
    var webpackMiddleware = require('../../webpack-middleware');
    webpackMiddleware(app);
} 

app.set('views', path.resolve(__dirname,'./views'));
app.set('view engine', 'pug');

app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log(`Web app listening on ${port}`));