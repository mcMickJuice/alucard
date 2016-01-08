var dbClient = require('./../data/dbClient');
var dbRepo = require('./../data/dbRepository');
var Q = require('q');

function queryRoms(queryObj) {
    /*  */
    var dbConnection;

    var dbConnectionPromise = dbClient.getDbConnection('videogame_roms')
        .then(db => {
            return dbConnection = db;
        });

    return Q.all([dbConnectionPromise, Q.when('roms') ,Q.when(queryObj), Q.when(50)])
        .spread(dbRepo.query)
        .then(items => {
            console.log(items)
        })
        .catch(err => console.log(err.stack))
    .finally(() => {
        dbConnection.close();
    })
}

module.exports = queryRoms;