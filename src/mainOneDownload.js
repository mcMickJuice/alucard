var downloadGame = require('./webDataProvider').downloadGame;
var fs = require('fs');
var path = require('path')

var writeToPath = path.resolve("C:/temp/roms/snes", 'SMW.zip');

var fileWriteStream = fs.createWriteStream(writeToPath);

function onComplete() {
    process.exit();
}

fileWriteStream.on('finish', function() {
    console.log('file done!');
    fileWriteStream.close(onComplete);
})

fileWriteStream.on('data', function() {
    console.log('data received!')
})

fileWriteStream.on('error', function(err) {
    console.log('error in file stream');
})

var downloadLink = '/roms/get-download.php?gid=35787&token=648fa7938968d8f6a868341e896ca332&mirror_available=true';

downloadGame(downloadLink, fileWriteStream);

