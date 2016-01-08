var Q = require('q');


//FIXME This can't be tested so I'm not sure if it works
function asyncToolBuilder(setTimeoutFunc) {
    function delayPromiseAction(millisecondsToDelay, action) {
        var deferred = Q.defer();

        setTimeoutFunc(() => {
            action().then(() => deferred.resolve(arguments));
        }, millisecondsToDelay);

        return deferred.promise;
    }

    function delay(millisecondsToDelay) {
        var deferred = Q.defer();

        setTimeoutFunc(() => {
            deferred.resolve();
        }, millisecondsToDelay);

        return deferred.promise;
    }

    return {
        delayPromiseAction,
        delay
    }
}

module.exports = {
    build: asyncToolBuilder
}