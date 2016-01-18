var io = require('socket.io-client');
var serviceMessageTypes = require('../../../enums/serviceMessageTypes');

function socketService(){
    var socket = io();
    socket.on('server ready', function() {
        console.log('socket connection made to server');
    });

    socket.on(serviceMessageTypes.COMPLETE, function(msg) {
        console.log('complete', msg);
    });

    socket.on(serviceMessageTypes.ERROR, function(err) {
        console.log('error', err);
    })

    socket.on(serviceMessageTypes.PROGRESS, function(msg) {
        console.log('progress', msg);
    })

    function on(eventName, callback) {
        socket.on(eventName, callback); //return the disconnect?
    }

    return {
        on
    }
}

module.exports = socketService;