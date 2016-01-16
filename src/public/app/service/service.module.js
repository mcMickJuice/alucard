var romService = require('./rom.service.js');
var angular = require('angular');

module.exports = angular.module('alucardServices', [])
    .service('romService', romService);