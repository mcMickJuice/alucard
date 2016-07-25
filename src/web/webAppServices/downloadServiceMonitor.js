// var {pingPi} = require('../../fileService/fileTransfer/piMonitor');
var {servicePort, hostAddress} = require('../../common/config');
var request = require('request');
//web request to service

function pingService(callback,interval) {
    try {
        requestServiceStatus(function(isUp, info) {
            callback(isUp, info);
            setTimeout(() => pingService(callback, interval), interval);
        });
    } catch (err) {
        console.log('Error occurred in requestServiceStatus', err);
    }
}

function requestServiceStatus (callback) {
    var url = `${hostAddress}:${servicePort}`; 
    console.log(url)

    request.get(url)
        .on('response', function(err, res) {
        if(err){
            console.log('an error occurred in ping', err);
            callback(false, err);
            return
        }

        var {isUp, info} = res.body;

        if(isUp) {
            callback(isUp);
        } else {
            callback(false, info);
        }
    })
}


module.exports = {
    pingService
}