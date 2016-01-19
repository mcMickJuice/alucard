/**
 * Created by MJ on 1/15/2016.
 */
var angular = require('angular');
var searchComponent = require('./components/search/search.component.js');
var jobsComponent = require('./components/jobs/jobs.component.js')
var statusComponent = require('./components/status/status.component.js');
var appInit = require('./appInit.js');

//service and 3rd party
/*eslint-disable */
var uiRouter = require('angular-ui-router');
/*eslint-enable */

var services = require('./service/service.module.js');

var deps = [
    'ui.router',
    services.name
];
angular
    .module('alucardApp', deps)
    .directive('alucardSearch', function () {
        return searchComponent
    })
    .directive('alucardJobs', function () {
        return jobsComponent
    })
    .directive('alucardStatus', function () {
        return statusComponent
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('search', {
                url: '/',
                template: '<alucard-search></alucard-search>'
            })
            .state('jobs', {
                url: '/jobs',
                template: '<alucard-jobs></alucard-jobs>',
                resolve: {
                    fetchJobsTask: function (jobStoreService) {
                        return jobStoreService.fetchJobs();
                    }
                }
            })
            .state('status', {
                url: '/status',
                template: '<alucard-status></alucard-status>'
            })
    })
    .run(appInit);