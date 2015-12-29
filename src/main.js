var dbClient = require('./data/dbClient');

(function() {
	var collection = 'console';

	dbClient.getCollection(collection)
		.then(items => {
			items.forEach(i => console.log(i.console));
		})
		.catch(err => console.error(err))
		.finally(() => process.exit())
})()