var dbClient = require('../../common/data/dbClient');
var dbRepo = require('../../common/data/dbRepository');
var consoleKey = 'consoles';
var consoleInfo = require('./seedConsoleData.js').consoleData;
var Q = require('q');
var {dbAddress} = require('../config')

function seedConsoleInfo(databaseName) {
    var dbConnection;
    var connectionPromise = (dbClient.getDbConnection(dbAddress,databaseName))
    .then(db => {
        return dbConnection = db;
    });
    
    return Q.all([connectionPromise, Q.when(consoleInfo), Q.when(consoleKey)])
        .spread(dbRepo.insertMany)
        .then(() => dbConnection.close());
}

module.exports = seedConsoleInfo


