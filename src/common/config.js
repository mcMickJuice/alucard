module.exports = {
    hostAddress: process.env.HOST,
    webPort: process.env.PORT,
    servicePort: process.env.SERVICE_PORT,
    serviceMount: process.env.SERVICE_MOUNT,
    baseOutputDir: process.env.OUTPUT_DIR,
    romFileDir: process.env.ROM_DIR,
    logFileDir: process.env.LOG_DIR,
    dbConfig: {
        dbAddress: process.env.DB_ADDRESS,
        dbName: process.env.DB_NAME   
    },
    fileProcessingConfig: {
        basePiPath: process.env.PI_PATH,
        sshPort: process.env.SSH_PORT,
        piIpAddress: process.env.PI_IP_ADDRESS,
        piPassword: process.env.PI_PW,
        piUsername: process.env.PI_USER
    },
    romRequestConfig: {
        romHost: 'http://www.emuparadise.me',
        cookieString: 'downloadcaptcha= 1; refexception= 1', 
        downloadLinkSelector: '#download-link', 
        gameListLinkSelector: 'a.index.gamelist', 
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }
}