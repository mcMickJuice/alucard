var angular = require('angular');
var toastr = require('angular-toastr');
require('toastr_css');

/* eslint-disable */
var ngAnimate = require('angular-animate');
/* eslint-enable */
var notificationService = require('./notification.service.js');

var deps = [toastr,
    'ngAnimate'
    ]

module.exports = angular.module('notification', deps)
    .service('notificationService', notificationService);