var Client = require('ssh2').Client;
var {fileProcessingConfig: {
    piIpAddress,
    piPassword,
    piUsername
}} = require('../../common/config')

//import pi config here?? or expose a HOF function that wraps it and treats
//as closed over?
//prefer the latter as its more injectable

function destination(config) {
    /*
storage root
connectionTimeoutLength
destination ip
connection credentials,
onProgress callback
clientCredentials

*/


    //transferable
    //Stream<T> - chunk updates
    function moveFileToDestination(localFilePath, remoteFilePath, onProgress, cb) {
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
            .connect(config.sshCredentials);


    }

    //Stream<T> - chunk updates...
    function removeFileFromDestination() {
        //simply remove from pi fs

        //if destination file not provided, just delete?  Should it be in charge 
        //of moving file back? Nah, consumer should handle that

        //sftp unlink, pass in full path
    }

    //monitorable
    //Promise<Response>
    function getUpStatus() {
        //defines what "up" is
        //pinging/polling is set up by consumer. this function merely details
        //what the destination of up is and reports an error if its not up

        /*
        Response: {
            error: error (optional),
            isOk: bool
        }
    
        error: {
            message: String,
            date: Date
        }
        */
    }


    //Promise<Storage> 
    function getStorageStatus() {
        //how much space is left in specified storage location
        /* 
        storage: {
            rawSpace: String,
            percentageLeft: Number
        }
        */
    }

    //Promise<roms>
    function currentRoms() {
        //list of roms currently on disc.
        //base path of roms --- RetroPie/roms
        //This should be source of truth that we reconcile with occassionally
        //when we shutdown, an error occurs, etc
        /* 
            get fileInformation for dir. return list of dir and filenames
    
            consumer can use this data to join and present an overview
            of held roms e.g. totals by console, type etc
        */
    }

    return {
        currentRoms: currentRoms,
        getStorageStatus: getStorageStatus,
        getUpStatus: getUpStatus,
        removeFile: removeFileFromDestination,
        moveFile: moveFileToDestination
    }
}