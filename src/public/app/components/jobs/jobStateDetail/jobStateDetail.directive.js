var template = require('./jobStateDetail.tmpl.html');
require('./jobStateDetail.less');

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
        controller: function(jobStateIconMapper) {
            var vm = this;

            console.log(vm.detail);
            vm.className = jobStateIconMapper.map(vm.detail.phase);
        }
    }
}

module.exports = jobStateDetailDirective;