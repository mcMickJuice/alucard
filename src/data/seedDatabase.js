var dbClient = require('./dbClient')
var dbRepo = require('./dbRepository')
var fs = require('fs')

function seedDatabase() {
	var databaseName = 'videogames_roms'
	var consoleData = JSON.parse(fs.readFileSync('./dist/data/seedConsoleData.json', 'utf8'))

	return dbClient.getDbConnection(databaseName)
		.then(db => {
			dbRepo.insertMany(db, consoleData.consoleData, 'console')
			.then(() => {
				return db.close();
			});
		})
		.catch(err => console.error(err))
}

seedDatabase().finally(function() {
	console.log('exiting!')
	process.exit()
});


