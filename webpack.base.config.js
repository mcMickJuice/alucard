var webpack = require('webpack')
var path = require('path');
var thirdParty = '/(node_modules|bower_components)/';

var babelSettings = {
	cacheDirectory: true,
	presets: ['es2015', 'stage-0']
};

var clientCode = path.resolve(__dirname, './src/web/client')

var config = {
    entry: [
			'./src/web/client/app.js'
		],
    output: {
        path: path.join(__dirname, 'dist-web/web/static'), //path where file is placed when packed
		publicPath: "/", //path where this file is available if requested
        filename: 'bundle.js' //name of output file
    },
	module: {
		loaders: [
			{ test: /\.js$/, include: clientCode, loader: 'babel', query: babelSettings },
            { test: /\.css$/, include: clientCode,loader: 'style!css' },
            { test: /\.less$/, include: clientCode, loader: 'style!css!less' },
            { test: /\.tmpl.html$/, include: clientCode, loader: 'text' }
		]
	},
    resolve: {
			alias: {
				toastr_css: path.join(__dirname, 'node_modules/angular-toastr/dist/angular-toastr.min.css')
			}
		},

};

module.exports = config;