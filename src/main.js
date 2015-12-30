var getLinksForConsole = require('./webScraperUtilities').getLinksForConsole;
var dbClient = require('./data/dbClient')

(function() {
	var consoleObj = {
			"console": "SNES",
			"allGamesUrl": "www.emuparadise.me/Super_Nintendo_Entertainment_System_(SNES)_ROMs/List-All-Titles/5"
		};

	getLinksForConsole(consoleObj)
		.then(function() {
			console.log('done!');
		})
})();