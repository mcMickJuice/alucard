//register listeners with socket for app wide notifications

appInit.$inject = ['toastr', 'socketService', 'serviceMessageTypes']
function appInit(toastr, socketService, serviceMessageTypes) {
    socketService.on(serviceMessageTypes.ERROR, downloadInfo => {
        toastr.error(`${downloadInfo.title}:\r\n${downloadInfo.error}`, 'Download Error!');
    });

    socketService.on(serviceMessageTypes.COMPLETE, downloadInfo => {
        toastr.success(downloadInfo.title,'Download Complete');
    });
}

module.exports = appInit;