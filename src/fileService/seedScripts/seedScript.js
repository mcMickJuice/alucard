var seedConsoleInfo = require('./consoleInfo/seedConsoleInfo');
var seedGameLinks = require('./romInfo/seedGameLinks');
var {dbConfig: {dbName}} = require('../../common/config');

console.log('starting seed')
seedConsoleInfo(dbName)
    .then(() => {
        console.log('console Info seeded')
        return seedGameLinks(dbName)})
    .then(() => console.log('Game links seeded'))
    .catch(err => {
        console.log('Error occurred', err)
    })