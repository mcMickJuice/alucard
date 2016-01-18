var romService = require('./rom.service.js');
var jobService = require('./job.service.js');
var socketService = require('./socket.service.js');
var angular = require('angular');

module.exports = angular.module('alucardServices', [])
    .service('romService', romService)
    .service('jobService', jobService)
    .service('socketService', socketService);