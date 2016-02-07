var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var thirdParty = '/(node_modules|bower_components)/';

var babelSettings = {
    cacheDirectory: true,
    presets: ['es2015']
};

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/public/app/app.js'
        ],
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            toastr_css: __dirname + "/node_modules/angular-toastr/dist/angular-toastr.min.css"
        }
    },
    module: {
        loaders: [
            {test: /\.css$/, exclude: thirdParty,loader: 'style!css'},
            {test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings},
            {test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
            {test: /\.tmpl.html$/, exclude: thirdParty, loader: 'text'}
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/public/index.html'
      })
    ],
    devServer: {
        contentBase: 'dist/public',
        hot: true
    },
    devtool: 'cheap-eval-source-map'
}