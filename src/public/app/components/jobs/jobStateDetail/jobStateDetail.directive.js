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
        controller: function() {

        }
    }
}

module.exports = jobStateDetailDirective;