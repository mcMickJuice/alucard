var Q = require('q');

//public api
function query(db, queryObject) {

}

function update(db, updateQuery) {

}

function getCollection(db, collectionName, limit = 50) {
	var deferred =  Q.defer();

	var cursor = db.collection(collectionName).find();

	limit = Math.min(limit, 100);

	cursor.limit(limit).toArray((err, items) => {
		if(err){
			deferred.reject(err)
		}

		deferred.resolve(items);
	})

	return deferred.promise;
}

function insert(db, jsonToInsert, collectionName) {
	var deferred = Q.defer();

	db.collection(collectionName)
		.insertOne(jsonToInsert, function(err, result) {
			if(err) {
				deferred.reject(err);
			}

			return deferred.resolve(result);
		})

	return deferred.promise;
}

function insertMany(db, jsonToInsert, collection) {
	var deferred = Q.defer();

	db.collection(collection)
		.insertMany(jsonToInsert, function(err, result) {
			if(err) {
				deferred.reject(err);
			}
			
			deferred.resolve(result)
		})

	return deferred.promise;
}


module.exports = {
	query,
	insert,
	insertMany,
	update,
	getCollection
}