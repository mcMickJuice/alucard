require('./romResult.less');
var template = require('./romResult.tmpl.html');

function romResult() {
    return {
        template,
        restrict: 'E',
        scope: {
            click: '&',
            item: '='
        },
        replace: true
    }
}

module.exports = romResult;