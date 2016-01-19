//register listeners with socket for app wide notifications
var messageTypes = require('../../enums/serviceMessageTypes');

function appInit(toastr, socketService) {
    socketService.on(messageTypes.ERROR, downloadInfo => {
        toastr.error(`${downloadInfo.title}:\r\n${downloadInfo.error}`, 'Download Error!');
    });

    socketService.on(messageTypes.COMPLETE, downloadInfo => {
        toastr.success(downloadInfo.title,'Download Complete');
    })

    //socketService.on(messageTypes.PROGRESS, progressInfo => {
    //    console.log(progressInfo);
    //})
}

module.exports = appInit;