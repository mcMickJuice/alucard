module.exports = {
    directoryMapping: [
        new ConsoleMapping('NES','nes'),
        new ConsoleMapping('SNES','snes'),
        new ConsoleMapping('Genesis-Megadrive','genesis'),
        new ConsoleMapping('N64','n64'),
        new ConsoleMapping('PSX','psx'),
    ]
};

function ConsoleMapping(consoleName, directoryName) {
    this.consoleName = consoleName;
    this.directoryName = directoryName;
}