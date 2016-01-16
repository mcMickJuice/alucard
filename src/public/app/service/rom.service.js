function romService($http) {
    function searchGame(searchCriteria) {
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

        return $http.post('http://localhost:666/download', {romId})
            .then(resp => {
                console.log(resp);
                //TODO notify
            })
            //TODO better error handling in service
            .catch(err => {
                console.log('error downloading rom')
                //TODO notify
            })
    }

    return {
        searchGame,
        downloadGame
    }
}

module.exports = romService