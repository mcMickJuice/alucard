function romService($http, buildApiUrl) {
    function searchGame(searchCriteria) {
        //TODO put endpoint in configuration
    var url = buildApiUrl('search');
        return $http.post(url, {searchCriteria})
            .then(({data}) => {
                return data.results || [];
            })
            .catch(err => {
                console.log('error fetching rom');
                console.log(err);
            })
    }

    function downloadGame(rom) {
        var romId = rom._id;
        var url = buildApiUrl(download);
        return $http.post(url, {romId})
            .then(() => {
                //TODO notify
                return {isSuccessful: true};
            })
            //TODO better error handling in service
            .catch(({data}) => {
                return {error: data};
            });
    }

    return {
        searchGame,
        downloadGame
    }
}

module.exports = romService