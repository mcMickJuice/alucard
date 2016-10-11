var Client = require('./SFTPClient')


var client = new Client();

client.connect(() => {
    client.readDir('RetroPie/roms')
})