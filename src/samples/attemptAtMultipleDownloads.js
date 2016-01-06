var dbClient = require('./../data/dbClient')
var dbRepo = require('./../data/dbRepository')
var config = require('./../secrets/config')
var Q = require('q')
var path = require('path')
var fs = require('fs')
var downloadGame = require('./../web/webDataProvider').downloadGame
var getDownloadLink = require('./../web/webDataProvider').getDownloadLink

var {dbName, outputFilePath} = config;

//grab n number of links
function getLinks(dbName, count, query){
    var dbConnection;
    
    var dbConnectionPromise = dbClient.getDbConnection(dbName)
        .then(db => {
           return dbConnection = db;
        });
        
    return Q.all([dbConnectionPromise, Q.when('roms'), Q.when(query) ,Q.when(count) ])
        .spread(dbRepo.query)
        .finally(_ => dbConnection.close())
}

function createWriteableStream(romInfo) {
    var filePath = path.resolve(outputFilePath, romInfo.consoleName ,`${romInfo.title}.zip`)
    
    var fileWriteStream = fs.createWriteStream(filePath);
    
    fileWriteStream.on('finish', function() {
        console.log(`Finished downloading ${romInfo.title}`);
        fileWriteStream.close();
    })

    fileWriteStream.on('error', function(err) {
        console.log(`error while downloading ${romInfo.title}`);
    })
    
    return fileWriteStream;
}

function createDirectory(consoleName) {
    var directoryPath = path.resolve(outputFilePath, consoleName)
    fs.existsSync(directoryPath) || fs.mkdirSync(directoryPath);
}

function downloadForConsole(consoleName, numberOfRoms) {
    createDirectory((consoleName));

    var query = {
        consoleName: consoleName,
        $or: [{title: /(USA)/}, {title: /(U)/}]
    }


    return getLinks(dbName, numberOfRoms, query)
        .then(romLinks => {

            var promises = romLinks.reduce((promiseChain, rom) => {
                var stream = createWriteableStream(rom);
                var getDownloadLinkPromise = getDownloadLink(`http://www.emuparadise.me${rom.url}`);

                var nextDownload = Q.all([getDownloadLinkPromise, Q.when(stream)])
                    .spread(downloadGame)
                    .catch(err => console.log('err in downloading process'))

                promiseChain.then(_ => {
                    return nextDownload;
                })

                return promiseChain;
            }, Q());

            //var promises = romLinks.map(rom => {
            //    var stream = createWriteableStream(rom);
            //    var getDownloadLinkPromise = getDownloadLink(`http://www.emuparadise.me${rom.url}`);
            //
            //    return Q.all([getDownloadLinkPromise, Q.when(stream)])
            //        .spread(downloadGame)
            //        .catch(err => console.log('err in downloading process'))
            //})

            return Q.all(promises);
        })
        .then(_ => console.log('finished downloading roms'))
}

function run() {
    var numberOfRoms = 5;

    var consolesToPull = [
        'SNES',
        'NES'
    ]

    var tasks = consolesToPull.reduce((promiseChain, consoleName) => {

        promiseChain.then(_ => {
            return downloadForConsole(consoleName, numberOfRoms);
        })

        return promiseChain;
    }, Q());

    return Q.all(tasks).catch(err => console.log(err.stack));
}

run();
