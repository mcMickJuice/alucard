var path = require('path')
var dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, './.env')});

var express = require('express')
var bodyParser = require('body-parser')
var {port, dbAddress, dbName} = require('./config');
var serviceRouter = require('./serviceRoutes')
var mongoose = require('alucard-common/models/mongoosePromisified')

mongoose.init(dbAddress, dbName);

var app = express();
app.use(bodyParser.json());

app.use(serviceRouter);

app.use((err, req, res, next) => {
    console.log(err.stack);

    next();
})

app.listen(port, () => console.log(`Alucard service listening at ${port}`))





