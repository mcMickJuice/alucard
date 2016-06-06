var path = require('path');
var thirdParty = '/(node_modules|bower_components)/';
var babelSettings = {
	cacheDirectory: true,
	presets: ['es2015']
};

module.exports = {
	module: {
		loaders: [
			{test: /\.json$/, loader: 'json'},
			{test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings}
		]
	},
	debug: true,
	devtool: 'source-map',
    target: 'node',
    entry: './src/fileService/seedScripts/seedScript.js',
   	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'script.js'
	}
	// devServer: {
	// 	stats: 'errors-only'
	// }
}