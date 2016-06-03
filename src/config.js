//host address
//webPort
//servicePort

//webPort, servicePort, hostAddress

//baseOutputDir, romFileDir
//TODO pivot this based on env variables
module.exports = {
    hostAddress: process.env.HOST || 'localhost',
    webPort: process.env.PORT || 6778,
    servicePort: process.env.PORT || 6777,
    baseOutputDir: process.env.OUTPUT_DIR || 'c://temp/alucard',
    romFileDir: process.env.ROM_DIR || 'roms',
    logFileDir: process.env.LOG_DIR || 'logs'
}