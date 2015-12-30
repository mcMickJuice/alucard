var fs = require('fs')
var parser = require('./htmlParse/htmlParser').parseHtmlAndMap
var dbClient = require('./data/dbClient')
var webClient = require('./webClient')


var selector = 'a.index.gamelist';
var collectionName = 'roms';
var host = "http://www.emuparadise.me"

function getLinksForConsole(consoleObj) {
	var consoleName = consoleObj.console;

	var requestObj = {
		host: host,
		path: consoleObj.allGamesUrl.replace(host,'')
	}
	
	var debug = require('debug')('main')

	//fetchHtml
	return webClient.makeRequest(requestObj )
		.then(html => {
			debug('we got html!')
	//parseHtml into objects
		function mapLink($wrapped) {
			return {
				title: $wrapped.text(),
				url: $wrapped.attr('href'),
				consoleName: consoleName
			}
		}

		return parser(html, selector, mapLink);
		})
		.then(results => {
			fs.writeFile('C:/temp/resultFile.txt', results.toString(), function(err) {

			})

			console.log('we got results')
		//insert into mongo as console collection
			return dbClient.insertMany(results, collectionName)
		})
		.catch(err => console.error(err)) ;
}


module.exports = {
	getLinksForConsole
}