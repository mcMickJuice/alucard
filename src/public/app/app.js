/**
 * Created by MJ on 1/15/2016.
 */
var angular = require('angular');
var searchComponent = require('./components/search/search.component.js');
var jobsComponent = require('./components/jobs/jobs.component.js')
var statusComponent = require('./components/status/status.component.js');
var romResultDirective = require('./components/search/romResult/romResult.directive.js');
var jobStateDirective = require('./components/jobs/jobStateItem/jobStateItem.directive.js');
var jobProgressDirective = require('./components/jobs/progressBar/jobProgress.directive.js');
var jobStateDetailDirective = require('./components/jobs/jobStateDetail/jobStateDetail.directive.js');
var jobStateIconDirective = require('./components/jobs/jobStateIcon/jobStateIcon.directive.js');
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
    .directive('alucardRomResult', romResultDirective)
    .directive('alucardJobState', jobStateDirective)
    .directive('alucardProgressBar', jobProgressDirective)
    .directive('alucardJobDetail', jobStateDetailDirective)
    .directive('alucardStateIcon', jobStateIconDirective)
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