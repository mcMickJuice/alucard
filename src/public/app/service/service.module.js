var romService = require('./rom.service.js');
var jobService = require('./job.service.js');
var socketService = require('./socket.service.js');
var notificationServiceModule = require('../thirdParty/notification/notification.module.js');
var angular = require('angular');

var deps = [notificationServiceModule.name]

module.exports = angular.module('alucardServices', deps)
    .service('romService', romService)
    .service('jobService', jobService)
    .service('socketService', socketService);