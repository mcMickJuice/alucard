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