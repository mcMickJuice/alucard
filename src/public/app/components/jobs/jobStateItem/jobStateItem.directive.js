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
        controller: function() {
            var stateMap = {
                COMPLETE: 'complete',
                ERROR: 'error',
                DOWNLOADING: 'downloading',
                'FILE_PROCESSING': 'file-processing',
                TRANSFER: 'transfer'
            };

            var vm = this;

            vm.className = stateMap[vm.item.phase];
        }
    }
}

module.exports = jobState;