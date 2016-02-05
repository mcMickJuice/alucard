var pingStatus = require('../../../enums/piStatusTypes').PING_STATUS;

function piStatusStore($rootScope,socketService){
    socketService.on(pingStatus, ({isPiActive}) => {
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