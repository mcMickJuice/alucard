//register listeners with socket for app wide notifications
var messageTypes = require('../../common/enums/serviceMessageTypes');

appInit.$inject = ['toastr', 'socketService']
function appInit(toastr, socketService) {
    socketService.on(messageTypes.ERROR, downloadInfo => {
        toastr.error(`${downloadInfo.title}:\r\n${downloadInfo.error}`, 'Download Error!');
    });

    socketService.on(messageTypes.COMPLETE, downloadInfo => {
        toastr.success(downloadInfo.title,'Download Complete');
    });
}

module.exports = appInit;