var template = require('./jobStateDetail.tmpl.html');

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

            vm.className = jobStateIconMapper.map(vm.detail.phase);
        }
    }
}

module.exports = jobStateDetailDirective;