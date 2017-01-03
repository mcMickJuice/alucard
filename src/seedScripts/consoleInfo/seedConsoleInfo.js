var dbClient = require('../../common/data/dbClient');
var dbRepo = require('../../common/data/dbRepository');
var {dbConfig: {dbName}} = require('../../common/config');
var consoleKey = 'consoles';
var consoleInfo = require('./seedConsoleData.js').consoleData;
var Q = require('q');

function seedConsoleInfo(databaseName) {
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


