var Client = require('ssh2').Client;
var {fileProcessingConfig: {
    piIpAddress,
    piPassword,
    piUsername
}} = require('../../common/config')

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
                onProgress({
                    fileSize: totalFile,
                    progress: totalTransferred
                });
            }

            sftp.fastPut(localFilePath, remoteFilePath, { step: stepFunction }, function (err) {
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
        .on('error', function (err) {
            cb(err);
        })
        .on('end', function () {
            client.end();
        })
        .connect({
            host: piIpAddress,
            username: piUsername,
            password: piPassword
        });


}

module.exports = {
    moveFile: moveFile
}