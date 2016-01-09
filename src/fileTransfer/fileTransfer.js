var Client = require('ssh2').Client;
var sshConfig = require('../secrets/sshConfig')

function moveFile(localFilePath, remoteFilePath, onProgress, cb) {
    var client = new Client();

    client.on('ready', function(err) {
        if(err) {
            cb(err);
        }

        client.sftp(function(err, sftp) {
            if(err) {
                cb(err);
            }

            sftp.fastPut(localFilePath, remoteFilePath, {}, function(err) {
                if(err) {
                    cb(err);
                }
                else{
                    cb()
                }
                client.end()
            });
        })
    })
    .on('data', function(err, data) {
        if(err){
            return;
        }

        onProgress('progress made')
        console.log(data);
    })
    .on('end', function() {
        client.end();
    })
    .connect(sshConfig);


}

module.exports = {
    moveFile: moveFile
}