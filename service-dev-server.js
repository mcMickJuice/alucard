var nodemon = require('nodemon')
var path = require('path')

nodemon({
    script: path.join(__dirname, 'src/fileService/app.js'),
    watch: [path.join(__dirname, 'src/fileService'), path.join(__dirname, 'common')]
})