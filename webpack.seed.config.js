var path = require('path')
var thirdParty = '/(node_modules|bower_components)/';
var babelSettings = {
	cacheDirectory: true,
	presets: ['es2015']
};

module.exports = {
	module: {
		loaders: [
			{test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings},
            {test: /\.json$/, loader: 'json'}
		]
	},
	debug: true,
    entry: './src/seedScripts/seedScript.js',
	target: 'node',
	output: {
		path: path.join(__dirname, 'dist/seedScripts'),
		filename: 'seedScript.js'
	}
};