piStatusStore.$inject = ['$rootScope', 'socketService', 'piStatusTypes']

function piStatusStore($rootScope,socketService, piStatusTypes){
    socketService.on(piStatusTypes.PING_STATUS, ({isPiActive}) => {
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