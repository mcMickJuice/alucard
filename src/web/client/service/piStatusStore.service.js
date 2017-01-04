var {PING_STATUS} = require('../../../common/enums/piStatusTypes');

piStatusStore.$inject = ['$rootScope', 'socketService']

function piStatusStore($rootScope,socketService){
    socketService.on(PING_STATUS, ({isPiActive}) => {
        if(subscriptions.length === 0) return;

        subscriptions.forEach(sub => {
            sub(isPiActive);
        });

        $rootScope.$apply();
    });

    var subscriptions = [];

    function subscribeToPiStatus(action) {
        subscriptions.push(action);
    }

    return {
        subscribeToPiStatus
    }
}

module.exports = piStatusStore;