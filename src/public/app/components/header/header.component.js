require('./header.less');
var template = require('./header.tmpl.html');

module.exports = {
    template,
    controller: function(piStatusStoreService) {
        var vm = this;

        piStatusStoreService.subscribeToPiStatus(status => {
            vm.isPiUp = status;
            vm.isPiDown = !vm.isPiUp;
        })
    },
    controllerAs: 'vm',
    replace: true
};
