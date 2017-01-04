var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')

var config = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
}

module.exports = merge(baseConfig, config)