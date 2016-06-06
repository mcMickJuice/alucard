module.exports = {
    hostAddress: process.env.HOST || 'http://localhost',
    webPort: process.env.PORT || 3333,
    servicePort: process.env.SERVICE_PORT || 666,
    baseOutputDir: process.env.OUTPUT_DIR || 'c://temp/alucard',
    romFileDir: process.env.ROM_DIR || 'roms',
    logFileDir: process.env.LOG_DIR || 'logs',
    dbConfig: {
        dbAddress: process.env.DB_ADDRESS || '192.168.33.10:27017',
        dbName: process.env.DB_NAME || 'alucard'     
    },
    fileProcessingConfig: {
        basePiPath: process.env.PI_PATH || '/home/pi/RetroPie/roms/',
        sshPort: '22',
        piIpAddress: process.env.PI_IP_ADDRESS || '192.168.1.177',
        piPassword: process.env.PI_PW,
        piUsername: process.env.PI_USER
    },
    romRequestConfig: {
        cookieString: 'downloadcaptcha= 1; refexception= 1', 
        downloadLinkSelector: '#download-link', 
        gameListLinkSelector: 'a.index.gamelist', 
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }
}