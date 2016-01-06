var dbClient = require('./../../data/dbClient');
var dbRepo = require('./../../data/dbRepository');
var fs = require('fs');
var dbName = require('../../secrets/dbConfig.js').dbName;
var consoleKey = 'console';
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
        .then(_ => dbConnection.close());
}

seedConsoleInfo(dbName)
.catch(err => console.log(err.stack))
.finally(function() {
	console.log('exiting!')
	process.exit()
});


