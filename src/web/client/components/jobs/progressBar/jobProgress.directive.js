//TODO could this be an attribute that requires ng-model that pulls progress out?
/*
 <td ng-show="job.progress">
 <div>{{job.progress.progress}} / {{job.progress.fileSize}}</div>
 </td>


 */
var template = require('./jobProgress.tmpl.html');
require('./jobProgress.less');

controller.$inject = ['$scope']
function controller($scope) {
    var vm = this;

    function calcPercentage(progress, fileSize) {
        var pct = (progress / fileSize * 1.0) * 100;
        return `${pct}%`;
    }

    $scope.$watch(() => vm.progress.progress, (newValue) => {
        //if(newValue === oldValue)

        vm.widthPct = calcPercentage(newValue, vm.progress.fileSize);
        console.log(vm.widthPct);
    })
}

function jobProgress() {
    return {
        template,
        restrict: 'E',
        replace: true,
        scope: {
            progress: '='
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: controller
    }
}

module.exports = jobProgress;