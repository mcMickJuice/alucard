var _ = require('lodash')

function searchCtrl(romService, notificationService) {
    var vm = this;
    vm.onTextChange = function () {
        debouncedSearchGames();
    };

    var debouncedSearchGames = _.debounce(searchGames, 1000)

    function searchGames() {
        var text = vm.text;
        var console = vm.console;
        var country = vm.country;

        if (!text) {
            //if text is empty (or any other criteria) dont do search and reset results
            vm.results = [];
            return;
        }

        romService.searchGame({text, console, country})
            .then(results => {
                if (!results.length) {
                    //TODO if results is empty...just set it and handle this situation in template?
                    vm.results = [];
                } else {
                    vm.results = results;
                }
            })
    }

    vm.queueDownload = function(rom) {
        queuedDownload = rom;
        vm.itemToDownload = rom;
        vm.showDialog = true;
    }

    /* Confirm download - no, i dont want to use ui bootstrap just to get their modal widget*/
    var queuedDownload = null;

    vm.confirm = function () {
        var rom = queuedDownload;
        queuedDownload = null;
        vm.showDialog = false;
        downloadGame(rom);
    };

    vm.cancel = function () {
        queuedDownload = null;
        vm.showDialog = false;
    };

    function downloadGame (rom) {
        romService.downloadGame(rom)
            .then(status => {
                if (status.isSuccessful) {
                    notificationService.success(rom.title, 'Download Started');
                } else {
                    notificationService.error(status.error, 'Error Queueing Download');
                }
            });
    }

    /*end confirm download */
}

module.exports = searchCtrl;
