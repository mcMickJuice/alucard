function jobService($http) {
    var routes = {
        recentJobs: 'jobs/current',
        allJobs: 'jobs',
        jobStateDetail: 'jobs/detail'
    };

    function getJobStateDetail(id) {
        return $http.get(`http://localhost:3333/${routes.jobStateDetail}/${id}`)
            .then(({data}) => {
                return data.detail;
            })
    }

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
        getAllJobs,
        getJobStateDetail
    }
}

module.exports = jobService;