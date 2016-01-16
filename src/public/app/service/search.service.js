function searchService($http) {
    function searchGame(searchCriteria) {
        return $http.post('http://localhost:3333/search', {searchCriteria})
            .then(({data}) => {
                return data.results || [];
            })
    }

    return {
        searchGame
    }
}

module.exports = searchService