var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

function getDbConnection(databaseName) {
	var deferred = Q.defer();
	var url = `mongodb://localhost:27017/${databaseName}`;

	MongoClient.connect(url, function(err, db) {
		if(err) {
			deferred.reject(err);
		}

		deferred.resolve(db);
	})

	return deferred.promise;
}

module.exports = {
	getDbConnection
}