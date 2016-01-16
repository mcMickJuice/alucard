var romService = require('./rom.service.js');
var jobService = require('./job.service.js');
var angular = require('angular');

module.exports = angular.module('alucardServices', [])
    .service('romService', romService)
    .service('jobService', jobService);