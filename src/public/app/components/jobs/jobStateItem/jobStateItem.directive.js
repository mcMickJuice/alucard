var template = require('./jobStateItem.tmpl.html');
require('./jobStateItem.less');

function jobState() {
    return {
        template,
        replace: true,
        restrict: 'E',
        scope: {
            item: '='
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: function ($scope) {
            var vm = this;

            function mapState(rawPhaseName) {
                var stateMap = {
                    COMPLETE: 'complete',
                    ERROR: 'error',
                    DOWNLOADING: 'downloading',
                    'FILE_PROCESSING': 'file-processing',
                    'FILE_TRANSFER': 'transfer'
                };

                return stateMap[rawPhaseName];
            }

            $scope.$watch(() => vm.item.phase, function(newValue,oldValue) {
                if(newValue === oldValue) return;

                vm.className = mapState(newValue);
            })

            vm.className = mapState(vm.item.phase);
        }
    }
}

module.exports = jobState;