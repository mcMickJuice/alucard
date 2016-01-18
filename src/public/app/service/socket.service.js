var io = require('socket.io-client');

function socketService(){
    var socket = io();
    socket.on('server ready', function() {
        console.log('socket connection made to server');
    });

    function on(eventName, callback) {
        socket.on(eventName, callback); //return the disconnect?
    }

    return {
        on
    }
}

module.exports = socketService;