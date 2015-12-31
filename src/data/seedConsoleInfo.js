var dbClient = require('./dbClient');
var dbRepo = require('./dbRepository');
var fs = require('fs');
var dbName = require('../config.js').dbName;
var consoleKey = require('../config.js').consoleCollectionKey;
var Q = require('q');

function seedConsoleInfo() {
	var databaseName = dbName;
	var consoleData = 
        JSON.parse(fs.readFileSync('./dist/data/seedConsoleData.json', 'utf8'))
        .consoleData;

    var dbConnection;
    var connectionPromise = (dbClient.getDbConnection(databaseName))
    .then(db => {
        return dbConnection = db;
    });
    
    return Q.all([connectionPromise, Q.when(consoleData), Q.when(consoleKey)])
        .spread(dbRepo.insertMany)
        .then(_ => dbConnection.close());
}

seedConsoleInfo()
.catch(err => console.log(err.stack))
.finally(function() {
	console.log('exiting!')
	process.exit()
});


