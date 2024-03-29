var processStrategy = require('./processStrategyMap');

function processFile(filePath, consoleName, processReporting) {
    var strategy = processStrategy[consoleName];

    var defaultReporter = processReporting || stdout;
    return strategy.process(filePath, defaultReporter);
}

function stdout(message) {
    console.log('file processor',message);
}

module.exports = processFile;