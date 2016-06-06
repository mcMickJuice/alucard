var net = require('net');
var Q = require('q');
var {fileProcessingConfig: {sshPort, piIpAddress}} = require('../../common/config');

function pingPi() {
    var deferred = Q.defer();

    var socket = net.connect({
        port: sshPort,
        host: piIpAddress
    }, () => {
        closeConnection(true);
    });

    //wait 3 seconds
    socket.setTimeout(3000, () => {
        closeConnection(false);
    });

    socket.on('error', () => {
        closeConnection(false);
    });

    //nuclear option in case timeout doesn't fire
    var cancelToken = setTimeout(() => {
        console.error('something is wrong with socket! not good!')

        try {
            socket.destroy();
        }
        /*eslint-disable */
        catch (ex) {
        }
        /*eslint-enable*/

        deferred.resolve(false);
    }, 6000);

    function closeConnection(isAlive) {
        clearTimeout(cancelToken);
        socket.end();
        deferred.resolve(isAlive);
    }



    return deferred.promise;
}

module.exports = {
    pingPi
}