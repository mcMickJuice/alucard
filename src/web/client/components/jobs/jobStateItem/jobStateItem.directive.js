var template = require('./jobStateItem.tmpl.html');
require('./jobStateItem.less');

controller.$inject = ['$scope', 'jobStateIconMapper']
function controller ($scope, jobStateIconMapper) {
            var vm = this;

            vm.getDetail = function() {
                vm.showDetail({id: vm.item.uuid});
            };

            $scope.$watch(() => vm.item.phase, function(newValue,oldValue) {
                if(newValue === oldValue) return;

                vm.className = jobStateIconMapper.map(newValue);
            })

            vm.className = jobStateIconMapper.map(vm.item.phase);
        }

function jobState() {
    return {
        template,
        replace: true,
        restrict: 'E',
        scope: {
            item: '=',
            showDetail: '&' //param name id
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: controller
    }
}

module.exports = jobState;