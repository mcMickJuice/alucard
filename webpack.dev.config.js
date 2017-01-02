var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')

var config = 
	{
		// entry: [
		// 	//tell webpack to run "inline", i.e. monitor changes in webpack-dev-server, which is running on port 3000
		// 	//'webpack-dev-server/client?http://localhost:3000',
		// ],
		// output: {
		// 	path: path.join(__dirname, 'dist', 'public'), //path where file is placed when packed
		// 	publicPath: 'http://localhost:3333/', //path where this file is available if requested
		// 	filename: 'frontend.js' //name of output file
		// },
		// resolve: {
		// 	alias: {
		// 		toastr_css: path.join(__dirname, 'node_modules/angular-toastr/dist/angular-toastr.min.css')
		// 	}
		// },
		// module: {
		// 	loaders: [
		// 		{ test: /\.css$/, exclude: thirdParty, loader: 'style!css' },
		// 		{ test: /\.less$/, exclude: thirdParty, loader: 'style!css!less' },
		// 		{ test: /\.tmpl.html$/, exclude: thirdParty, loader: 'text' }
		// 	]
		// },
	        devtool: 'source-map',
	}

module.exports = merge(baseConfig, config);