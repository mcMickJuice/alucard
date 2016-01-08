var Client = require('ssh2').Client;
var sshConfig = require('../secrets/sshConfig')
//var fs = require('fs');
//var path = require('path')

function moveFile(localFilePath, remoteFilePath, onProgress, cb) {
    var client = createClient();

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

//function listFiles(filePath, cb) {
//    var client = createClient();
//
//    client.on('ready', function() {
//            console.log('Client is ready');
//
//            client.sftp(function(err, sftp)  {
//                if(err) {
//                    cb(err, null);
//                    return;
//                }
//
//                console.log('connection made to sftp')
//                sftp.readdir(filePath, function(err, list) {
//                    if(err) {
//                        cb(err, null);
//                    }
//
//                    cb(null, list);
//                    //var fileNames = list.map(function(file) {
//                    //    return file.filename;
//                    //});
//                    //
//                    //var fileNamesString = fileNames.join('\r\n');
//                    //
//                    //var writeStream = fs.createWriteStream('c:/temp/romDirListing.txt',{encoding: 'utf8'});
//                    //writeStream.write(fileNamesString);
//                    //writeStream.end();
//                    //
//                    //console.log('file written');
//                })
//            });
//        })
//        .on('end', function() {
//            client.close();
//            console.log('client closed');
//        })
//        .connect(sshConfig);
//}

function createClient() {

    var c = new Client();

    c.on('ready', function() {
    })
    .on('error', function(err){
        console.log('an error has occurred')
        console.log(err.stack)
    })

    return c;
}

//var sourceDir = 'C:/temp/sample-files';
////var destination = '/home/pi/RetroPie/roms/dreamcast';
//var destination = '/home/pi/RetroPie/roms/dreamcast/';

//function onProgress(progress) {
//    console.log('progress', progress);
//}
//
//function onCompletion(err, something) {
//    if(err) {
//        console.log(err.stack);
//        console.log(err);
//        return
//    }
//
//    console.log('file transfer complete')
//}
//
//fs.readdir(sourceDir, function(err, fileNames) {
//    if(err){
//        console.log(err);
//        console.log(err.stack);
//    }
//
//    fileNames.forEach(function(fileName) {
//        var sourcePath = path.resolve(sourceDir,fileName);
//        var destinationPath = destination + fileName;
//        moveFile(sourcePath, destinationPath
//            , function(){}, onCompletion);
//    })
//})

//moveFile(sourceFile, destination, onProgress, onCompletion);


module.exports = {
    moveFile: moveFile
}