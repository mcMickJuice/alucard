var Q = require('q')

function noopStrategy(filePath){
    var outputFilePaths = [filePath];
    return Q.when(outputFilePaths);
}

module.exports = {
    process: noopStrategy
};