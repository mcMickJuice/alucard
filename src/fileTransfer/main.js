var moveFile = require('./fileTransferer').moveFile;

var sourceFile = 'M:/My Documents/Roms/psx/Castlevania - Symphony of the Night (E) [SLES-00524].rar';
var destination = '/home/pi/RetroPie/roms/dreamcast/Castlevania.rar';

moveFile(sourceFile,destination, function(p){console.log('progress', p)}, function(err) {
    if(err){
        console.log(err)
        console.log(err.stack);
        return
    }
   console.log('upload complete')
})