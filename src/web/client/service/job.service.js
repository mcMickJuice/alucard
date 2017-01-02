function jobService($http, buildApiUrl) {
    var routes = {
        recentJobs: 'jobs/current',
        allJobs: 'jobs',
        jobStateDetail: 'jobs/detail'
    };

    function getJobStateDetail(id) {
        var url = buildApiUrl(routes.jobStateDetail);
        return $http.get(`${url}/${id}`)
            .then(({data}) => {
                return data.detail;
            })
    }

    function getRecentJobs(){
        var url = buildApiUrl(routes.recentJobs);
        return $http.get(url)
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