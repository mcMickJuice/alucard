var config = require('./webpack.dev.config');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')

module.exports = function (app) {
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        quiet: true,
        stats: { colors: true }
    }))
}

