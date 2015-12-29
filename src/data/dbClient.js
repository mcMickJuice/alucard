var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

//todo move into config file
var url = "mongodb://localhost:27017/videogames_roms";

//private functions
function getDbConnection() {
	var deferred = Q.defer();

	MongoClient.connect(url, function(err, db) {
		if(err) {
			deferred.reject(err);
		}

		console.log("Connection made to database");

		deferred.resolve(db);
	})

	return deferred.promise;
}

function cleanupDbConnection(dbConnection) {
	dbConnection.close();
}


//public api
function query(queryObject) {

}

function update(updateQuery) {

}

function getCollection(collectionName, limit = 50) {

	return getDbConnection()
		.then(db => {
			var deferred =  Q.defer();

			var cursor = db.collection(collectionName).find();

			limit = Math.min(limit, 100);

			cursor.limit(limit).toArray((err, items) => {
				if(err){
					deferred.reject(err)
				}

				cleanupDbConnection(db);

				deferred.resolve(items);
			})

			return deferred.promise;
		})
}

function insert(jsonToInsert, collectionName) {
	return getDbConnection()
		.then(db => {
			var deferred = Q.defer();
			db.collection(collectionName)
				.insertOne(jsonToInsert, function(err, result) {
					if(err) {
						//something is wrong!
						console.error(err);
					}

					return deferred.resolve(db);
				})

			return deferred.promise;
		})
		.finally(cleanupDbConnection);
}

function insertMany(jsonToInsert, collection) {
	return getDbConnection()
		.then(db => {
			var deferred = Q.defer();
			db.collection(collection)
				.insertMany(jsonToInsert, function(err, result) {
					if(err) {
						console.error(err);
					}

					//todo delete this console
					console.log('in callback of insertMany');

					cleanupDbConnection(db);
				})
		})
}


module.exports = {
	query,
	insert,
	insertMany,
	update,
	getCollection
}