var piDestination = require('./raspberryPi')
var mockDestination = require('./mockDestination')

if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'mock') {
    console.log('exporting mockDestination')
    module.exports = mockDestination
} else {
    console.log('exporting piDestination')
    module.exports = piDestination
}