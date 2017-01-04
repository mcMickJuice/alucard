
notificationService.$inject = ['toastr']
function notificationService(toastr) {
    function success(message, title) {
        toastr.success(message, title);
    }

    function error(errorMessage, title) {
        toastr.error(errorMessage, title)
    }

    return {
        success,
        error
    }
}

module.exports = notificationService