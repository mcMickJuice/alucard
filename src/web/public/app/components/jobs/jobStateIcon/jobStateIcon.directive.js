require('./jobStateIcon.less')
var template = require('./jobStateIcon.tmpl.html');

function jobStateIconDirective(){
    return {
        template,
        replace: true,
        scope: {
            className: '='
        },
        bindToController: true,
        controllerAs: 'vm',
        controller: function() {

        }
    }
}

module.exports = jobStateIconDirective;