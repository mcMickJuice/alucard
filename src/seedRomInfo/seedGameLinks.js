var seedOrchestrator = require('./seedOrchestrator');

function run(dbName) {
    return seedOrchestrator.seedDbWithGameLinks(dbName);
}

module.exports = run;