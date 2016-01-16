var Client = require('ssh2').Client;
var sshConfig = require('../secrets/sshConfig')

function moveFile(localFilePath, remoteFilePath, onProgress, cb) {
    var client = new Client();

    client.on('ready', function (err) {
            if (err) {
                cb(err);
            }

            client.sftp(function (err, sftp) {
                if (err) {
                    cb(err);
                }

                function stepFunction(totalTransferred, chunk, totalFile) {
                    onProgress(totalTransferred, totalFile);
                }

                sftp.fastPut(localFilePath, remoteFilePath, {step: stepFunction}, function (err) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb()
                    }
                    client.end()
                });
            })
        })
        .on('error', function(err) {
            cb(err);
        })
        .on('end', function () {
            client.end();
        })
        .connect(sshConfig);


}

module.exports = {
    moveFile: moveFile
}