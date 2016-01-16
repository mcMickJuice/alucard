var path = require('path');

var thirdParty = '/(node_modules|bower_components)/';

var babelSettings = {
    cacheDirectory: true,
    presets: ['es2015']
};

module.exports = {
    entry: './src/public/app/app.js',
    output: {
        path: path.resolve(__dirname, 'src/public'),
        publicPath: '/src/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, exclude: thirdParty,loader: 'style!css'},
            {test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings},
            {test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
            {test: /\.tmpl.html$/, exclude: thirdParty, loader: 'text'}
        ]
    },
    devtool: '#inline-source-map'
}