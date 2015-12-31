var seedGameLinks = require('./seedRomInfo/seedGameLinks')

seedGameLinks.run('video_games')
    .then(_ => console.log('done!'))
    .catch(err => {
        console.log(err.stack);
    })
