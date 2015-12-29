var dbClient = require('./dbClient')
var fs = require('fs')

function seedDatabase() {
	var consoleData = JSON.parse(fs.readFileSync('./dist/data/seedConsoleData.json', 'utf8'))

	return dbClient.insertMany(consoleData.consoleData, 'console')
		.then(() => console.log('console data is inserted'))
}

seedDatabase().finally(function() {
	console.log('exiting!')
	process.exit()
});


