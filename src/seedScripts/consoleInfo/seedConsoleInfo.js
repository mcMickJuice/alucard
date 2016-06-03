var dbClient = require('./../../data/dbClient');
var dbRepo = require('./../../data/dbRepository');
var {dbConfig: {dbName}} = require('../../config.js');
var consoleKey = 'consoles';
var consoleInfo = require('./seedConsoleData.js').consoleData;
var Q = require('q');

function seedConsoleInfo(databaseName) {
    console.log('in seed consoleInfo')
    var dbConnection;
    var connectionPromise = (dbClient.getDbConnection(databaseName))
    .then(db => {
        return dbConnection = db;
    });
    
    return Q.all([connectionPromise, Q.when(consoleInfo), Q.when(consoleKey)])
        .spread(dbRepo.insertMany)
        .then(() => dbConnection.close());
}

module.exports = seedConsoleInfo


