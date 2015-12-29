var fs = require('fs')
var parser = require('./htmlParse/htmlParser').parseHtmlAndMap
var dbClient = require('./data/dbClient')
var webClient = require('./webClient')


// function mapLink($wrapped) {
// 	return {
// 		title: $wrapped.text(),
// 		url: $wrapped.attr('href')
// 	}
// }

var selector = 'a.index.gamelist';
var collectionName = 'roms';

function getLinksForConsole(consoleObj) {
	var consoleName = 'NES';
// 	var requestObj = {
// 		host: 'localhost',
// 		port: '8888',
// 		method: 'get',
// headers: {
// 	hostname: 'www.emuparadise.me/Nintendo_Entertainment_System_ROMs/List-All-Titles/13'
// }
	// }
	// 
	var requestObj = {
		hostname: 'www.emuparadise.me',
		path: '/Nintendo_Entertainment_System_ROMs/List-All-Titles/13'
	}

	//fetchHtml
	return webClient.makeRequest(requestObj )
		.then(html => {
			console.log('we got html')
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
			console.log(results)

			fs.writeFile('C:/temp/resultFile.txt', results.toString(), function(err) {

			})

			console.log('we got results')
		//insert into mongo as console collection
			return dbClient.insertMany(results, collectionName)
		})
		.catch(err => console.error(err)) ;
}

console.log('hello?')

getLinksForConsole()
	.then(function() {
		process.stdout('im done')
	})


// module.exports = {
// 	getLinksForConsole
// }