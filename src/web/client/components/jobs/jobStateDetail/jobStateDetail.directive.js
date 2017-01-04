var template = require('./jobStateDetail.tmpl.html');
require('./jobStateDetail.less');

controller.$inject = ['jobStateIconMapper']
function controller (jobStateIconMapper) {
            var vm = this;

            vm.stateClassName = jobStateIconMapper.map(vm.detail.phase);
        }

function jobStateDetailDirective() {
    return {
        scope: {
            dismiss: '&',
            detail: '='
        },
        template,
        replace: true,
        restrict: 'E',
        bindToController: true,
        controllerAs: 'vm',
        controller: controller
    }
}

module.exports = jobStateDetailDirective;