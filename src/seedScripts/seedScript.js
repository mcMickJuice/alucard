var dotenv = require('dotenv')
var path = require('path');
dotenv.config({path: path.resolve(__dirname,'./.env')})

var seedConsoleInfo = require('./consoleInfo/seedConsoleInfo');
var seedGameLinks = require('./romInfo/seedGameLinks');
var {dbName} = require('./config');

console.log('starting seed')
seedConsoleInfo(dbName)
    .then(() => {
        console.log('console Info seeded')
        return seedGameLinks(dbName)})
    .then(() => console.log('Game links seeded'))
    .catch(err => {
        console.log('Error occurred', err)
    })