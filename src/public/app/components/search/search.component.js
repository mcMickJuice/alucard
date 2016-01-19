var template = require('./search.tmpl.html');
var controller = require('./search.ctrl.js');
require('./search.less')

var searchComponent = {
    template,
    controller,
    controllerAs: 'vm',
};


module.exports = searchComponent;