var searchService = require('./search.service.js');
var angular = require('angular');

module.exports = angular.module('alucardServices', [])
    .service('searchService', searchService);