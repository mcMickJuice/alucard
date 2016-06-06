//var getLinksForConsole = require('../../webDataProvider').getLinksForConsole;
var Q = require('q');
var dbClient = require('../../../common/data/dbClient');
var dbRepo = require('../../../common/data/dbRepository');
var webDataProvider = require('../../../common/webService/webDataProvider');
var consoleCollectionKey = 'consoles';


function insertAllGameLinksForConsoles(databaseName) {
    var dbConnection;
    
	return dbClient.getDbConnection(databaseName)
	.then(db => {
    //save off dbConnection for disposal        
		return dbConnection = db;
	})
    .then(() => {
        return dbRepo.getCollection(dbConnection, consoleCollectionKey)
    })
    .then(consoles => {
        console.log(consoles)
               return Q.all(consoles.map(c => {
                   return insertLinksForConsole(dbConnection,c);
               }))
           })
    .finally(() => {
        dbConnection.close()
    })
}

function insertLinksForConsole(db, consoleObj) {
    var linksPromise = webDataProvider.getLinksForConsole(consoleObj);
//TODO update initialize Script with Rom model
	return Q.all([Q.when(db), linksPromise, Q.when('roms')])
	//spread array of values as arguments to given function
		.spread(dbRepo.insertMany)
		.then(() => {
			console.log(`items inserted into database for ${consoleObj.console}`);
		})
}

module.exports = insertAllGameLinksForConsoles
