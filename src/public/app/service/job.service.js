function jobService($http) {
    var routes = {
        recentJobs: 'jobs/current',
        allJobs: 'jobs'
    };

    function getRecentJobs(){
        return $http.get(`http://localhost:3333/${routes.recentJobs}`)
            .then(({data})=> {
                return data.jobs;
            })
    }

    function getAllJobs(){
        throw new Error('getAllJobs not implemented')
    }

    return {
        getRecentJobs,
        getAllJobs
    }
}

module.exports = jobService;