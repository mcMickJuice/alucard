module.exports = {
    hostAddress: process.env.HOST || 'localhost',
    webPort: process.env.PORT || 6778,
    servicePort: process.env.PORT || 6777,
    baseOutputDir: process.env.OUTPUT_DIR || 'c://temp/alucard',
    romFileDir: process.env.ROM_DIR || 'roms',
    logFileDir: process.env.LOG_DIR || 'logs',
    dbConfig: {
        dbAddress: process.env.DB_ADDRESS || '192.168.33.10:27017',
        dbName: process.env.DB_NAME || 'alucard'     
    },
    fileProcessingConfig: {
        basePiPath: process.env.PI_PATH || 'c://pi', //TODO
        sshPort: '', //TODO update to actual port
        piIpAddress: '' //TODO update to actual IP
    },
    romRequestConfig: {
        cookieString: '', 
        downloadLinkSelector: '', 
        gameListLinkSelector: '', 
        userAgent: ''
    }
}