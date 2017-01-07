module.exports = {
    port: process.env.PORT,
    piIpAddress: process.env.PI_IP_ADDRESS,
    piPassword: process.env.PI_PW,
    piUsername: process.env.PI_USER,
    basePiPath: process.env.PI_PATH,
    sshPort: 22,
    baseOutputDir: process.env.OUTPUT_DIR,
    romFileDir: process.env.ROM_DIR,
    dbAddress: process.env.DB_ADDRESS,
    dbName: process.env.DB_NAME,
    hostAddress: process.env.HOST,
    webPort: process.env.WEB_PORT
}