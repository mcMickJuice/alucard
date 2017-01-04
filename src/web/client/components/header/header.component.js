require('./header.less');
var template = require('./header.tmpl.html');

controller.$inject = ['piStatusStoreService']
function controller(piStatusStoreService) {
        var vm = this;

        piStatusStoreService.subscribeToPiStatus(status => {
            vm.isPiUp = status;
            vm.isPiDown = !vm.isPiUp;
        })
    }

module.exports = {
    template,
    controller: controller,
    controllerAs: 'vm',
    replace: true
};
