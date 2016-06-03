module.exports = {
    hostAddress: process.env.HOST || 'localhost',
    webPort: process.env.PORT || 6778,
    servicePort: process.env.PORT || 6777,
    baseOutputDir: process.env.OUTPUT_DIR || 'c://temp/alucard',
    romFileDir: process.env.ROM_DIR || 'roms',
    logFileDir: process.env.LOG_DIR || 'logs',
    dbConfig: {
        dbAddress: process.env.DB_ADDRESS || 'localhost:67000',
        dbName: process.env.DB_NAME || 'alucard'     
    }
}