function jobStateIconMapper() {
    function map(rawPhaseName) {
        var stateMap = {
            COMPLETE: 'complete',
            ERROR: 'error',
            DOWNLOADING: 'downloading',
            'FILE_PROCESSING': 'file-processing',
            'FILE_TRANSFER': 'transfer'
        };

        return stateMap[rawPhaseName];
    }

    return {
        map
    }
}

module.exports = jobStateIconMapper;
