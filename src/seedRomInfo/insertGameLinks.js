var getLinksForConsole = require('../webDataProvider').getLinksForConsole;
var Q = require('q');
var dbClient = require('../data/dbClient');
var dbRepo = require('../data/dbRepository');
var webDataProvider = require('./webDataProvider');
var consoleCollectionKey = require('../config').consoleCollectionKey;

function insertAllGameLinksForConsoles(dbName) {
    var dbConnection;
    
	return dbClient.getDbConnection(dbName)
	.then(db => {
    //save off dbConnection for disposal        
		return dbConnection = db;
	})
    .then(_ => {
        return dbRepo.getCollection(dbConnection, consoleCollectionKey)
           .then(consoles => {
               return Q.all(consoles.map(c => {
                   return insertLinksForConsole(dbConnection,c);
               }))
           })
           .catch(err => {
               console.log(err.stack)
           })
    })
    .finally(_ => {
        dbConnection.close()
    })
}

function insertLinksForConsole(db, consoleObj) {
    var linksPromise = webDataProvider.getLinksForConsole(consoleObj);

	return Q.all([Q.when(db), linksPromise, Q.when('roms')])
	//spread array of values as arguments to given function
		.spread(dbRepo.insertMany)
		.then(results => {
			console.log(`items inserted into database for ${consoleObj.console}`);
		})
}

module.exports = insertAllGameLinksForConsoles
