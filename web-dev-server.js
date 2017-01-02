var nodemon = require('nodemon')
var path = require('path');

var clientApp = path.join(__dirname, './src/web/public')

nodemon({
    script: path.join(__dirname, './src/web/app.js'),
    ext: 'js',
    ignore: clientApp,
    watch: path.join(__dirname, './src') //watch all files excluding web/public-browser files
})