var getLinksForConsole = require('./webDataProvider').getLinksForConsole;
var dbClient = require('./data/dbClient');
var dbRepo = require('./data/dbRepository')
var Q = require('q');

//seed database with links for each console
var dbClient = require('../data/dbClient');
var dbRepo = require('../data/dbRepository');
var webDataProvider = require('./webDataProvider');

var consoleCollectionKey = 'console';

function seedDbWithGameLinks(dbName) {
    var dbConnection;
    
	return dbClient.getDbConnection(dbName)
	.then(db => {
    //save off dbConnection for disposal        
		return dbConnection = db;
	})
    .then(_ => {
        return dbRepo.getCollection(dbConnection, consoleCollectionKey)
           .then(consoles => {
               consoles.reduce((acc, next) => {
                   acc.then(_ => {
                       insertLinksForConsole(dbConnection, next);
                   })
                   
                   return acc;
               }, Q.when())
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
			console.log('items inserted into database');
		})
}
