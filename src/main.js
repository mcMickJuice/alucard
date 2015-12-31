var insertGameLinks = require('./seedRomInfo/insertGameLinks')
var dbName = require('./config.js').dbName

insertGameLinks(dbName)
    .then(_ => console.log('Finished inserting roms'))
    .catch(err => {
        console.log(err.stack);
    })
