var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

function getDbConnection(dbAddress,databaseName) {
    var deferred = Q.defer();
    var url = `mongodb://${dbAddress}/${databaseName}`;
	MongoClient.connect(url, function(err, db) {
		if(err) {
			deferred.reject(err);
		}

		deferred.resolve(db);
	});

	return deferred.promise;
}

module.exports = {
	getDbConnection
}