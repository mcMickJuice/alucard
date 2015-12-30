var getLinksForConsole = require('./webScraperUtilities').getLinksForConsole;
var dbClient = require('./data/dbClient');
var dbRepo = require('./data/dbRepository')
var Q = require('q');

(function() {
	var consoleObj = {
			"console": "SNES",
			"allGamesUrl": "http://www.emuparadise.me/Super_Nintendo_Entertainment_System_(SNES)_ROMs/List-All-Titles/5"
		};
	var dbConnection;
	var getDbPromise = dbClient.getDbConnection('video_games')
	.then(db => {
		return dbConnection = db;
	});

	var linksPromise = getLinksForConsole(consoleObj);

	Q.all([getDbPromise, linksPromise, Q.when('roms')])
	//spread array of values as arguments to given function
		.spread(dbRepo.insertMany)
		.then(results => {
			console.log('items inserted into database');
		})
		.catch(err => {
			console.log(err.stack)
		})
		.finally(_ => {
			dbConnection.close()
			process.exit()
		})
})();