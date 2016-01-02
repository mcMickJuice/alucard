var dbClient = require('./data/dbClient')
var dbRepo = require('./data/dbRepository')
var config = require('./config')
var Q = require('q')
var path = require('path')
var fs = require('fs')
var downloadGame = require('./webDataProvider').downloadGame
var getDownloadLink = require('./webDataProvider').getDownloadLink

var {dbName, outputFilePath} = config;

var consolesToPull = [
    'snes',
    'nes'
]

//grab n number of links
function getLinks(dbName, count){
    var dbConnection;
    
    var dbConnectionPromise = dbClient.getDbConnection(dbName)
        .then(db => {
           return dbConnection = db;
        });
        
    return Q.all([dbConnectionPromise, Q.when('roms'), Q.when(count)])
        .spread(dbRepo.getCollection)
        .finally(_ => dbConnection.close())
}

function createWriteableStream(romInfo) {
    var filePath = path.resolve(outputFilePath, `${romInfo.title}.zip`)
    
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

function run() {
    var romsToDownload = 1;
    
    getLinks(dbName, romsToDownload)
        .then(romLinks => {
            var promises = romLinks.map(rom => {
                var stream = createWriteableStream(rom);
                var getDownloadLinkPromise = getDownloadLink(`http://www.emuparadise.me${rom.url}`);
                
                return Q.all([getDownloadLinkPromise, Q.when(stream)])
                           .spread(downloadGame)
                           .catch(err => console.log('err in downloading process'))
            })
            
            return Q.all(promises);
        })
        .then(_ => console.log('finished downloading roms'))
        .catch(err => console.log(err.stack))
}

run();
