var template = require('./dialog.tmpl.html');
require('./dialog.less');

function dialogDirective(){
    return {
        restrict: 'E',
        scope: {
            item: '=',
            confirm: '&',
            cancel: '&'
        },
        controller: function(){},
        controllerAs: 'vm',
        bindToController:true,
        replace: true,
        template
    }
}

module.exports = dialogDirective;