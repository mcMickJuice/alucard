var romService = require('./rom.service.js');
var jobService = require('./job.service.js');
var socketService = require('./socket.service.js');
var notificationServiceModule = require('../thirdParty/notification/notification.module.js');
var jobStoreService = require('./jobStore.service.js');
var jobStateIconMapper = require('./jobStateIconMapper.service.js');
var piStatusStoreService = require('./piStatusStore.service.js');
var angular = require('angular');

var deps = [notificationServiceModule.name]

module.exports = angular.module('alucardServices', deps)
    .service('romService', romService)
    .service('jobService', jobService)
    .service('socketService', socketService)
    .service('piStatusStoreService', piStatusStoreService)
    .service('jobStoreService', jobStoreService)
    .service('jobStateIconMapper', jobStateIconMapper);