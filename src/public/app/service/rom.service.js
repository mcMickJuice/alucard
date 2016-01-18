function romService($http) {
    function searchGame(searchCriteria) {
        //TODO put endpoint in configuration
        return $http.post('http://localhost:3333/search', {searchCriteria})
            .then(({data}) => {
                return data.results || [];
            })
            .catch(err => {
                console.log('error fetching rom');
            })
    }

    function downloadGame(rom) {
        var romId = rom._id;

        return $http.post('http://localhost:3333/download', {romId})
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