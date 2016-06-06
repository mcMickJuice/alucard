var gulp = require('gulp');
// var runSequence = require('run-sequence');
// var babel = require('gulp-babel');
var todo = require('gulp-todo');
var del = require('del');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var webpack = require('webpack');
var nodemon = require('nodemon');
var WebPackDevServer = require('webpack-dev-server');
var path = require('path');
var DeepMerge = require('deep-merge');
var fs = require('fs');


var jsSourceGlob = './src/!(public)/*.js';
var staticGlob = './src/web/public/**';
var allJs = './src/**/*.js';
var destination = './dist';
var public = '/public';


gulp.task('clean', function() {
	//clear out all distribution folder
	return del(destination);
});

gulp.task('clean-static', function() {
	return del(destination + public);
});

/*Webpack settings*/
var deepMerge = DeepMerge(function(target, source, key) {
	if(target instanceof Array){
		return [].concat(target,source);
	}

	return source;
})
var thirdParty = '/(node_modules|bower_components)/';

var babelSettings = {
	cacheDirectory: true,
	presets: ['es2015']
};

var baseWebpackConfig = {
	module: {
		loaders: [
			{test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings}
		]
	},
	debug: true,
	devtool: 'source-map',
	// devServer: {
	// 	stats: 'errors-only'
	// }
};

function config(overrides) {
	return deepMerge(baseWebpackConfig, overrides || {});
}

var frontEndConfig = config(
	{
		entry: [
			//tell webpack to run "inline", i.e. monitor changes in webpack-dev-server, which is running on port 3000
			//'webpack-dev-server/client?http://localhost:3000',
			'./src/web/public/app/app.js'
		],
		output: {
			path: path.join(__dirname, 'dist', 'public'), //path where file is placed when packed
			publicPath: 'http://localhost:3333/', //path where this file is available if requested
			filename: 'frontend.js' //name of output file
		},
		resolve: {
			alias: {
				toastr_css: path.join(__dirname,'node_modules/angular-toastr/dist/angular-toastr.min.css')
			}
		},
		module: {
			loaders: [
				{test: /\.css$/, exclude: thirdParty,loader: 'style!css'},
				{test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
				{test: /\.tmpl.html$/, exclude: thirdParty, loader: 'text'}
			]
		}
	}
);

//backend
var nodeModules = fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['bin'].indexOf(x) === -1;
	});

var webBackendConfig = config({
	entry: [
		'webpack/hot/signal.js',
		'./src/app/webApp.js'
	],
	target: 'node',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'backend.js'
	},
	node: {
		__dirname: false,
		__filename: true
	},
	externals: [
		function(context, request, callback) {
			var pathStart = request.split('/')[0];
			if(nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
				return callback(null, 'commonjs ' + request);
			}

			callback();
		}
	],
	recordsPath: path.join(__dirname, 'dist/_records'),
	plugins: [
		new webpack.IgnorePlugin(/.(css|less|tmpl.html)$/),
		new webpack.BannerPlugin('require("source-map-support").install();',
			{ raw: true, entryOnly: false }),
		new webpack.HotModuleReplacementPlugin({quiet: true})
	]
});

function onBuild(done) {
	return function(err) {
		if(err) {
			console.log('Error', err);
		}
		else {
			console.log('Webpack finished!')
		}

		if(done) {
			done();
		}
	}
}

gulp.task('frontend-build', function(done) {
	webpack(frontEndConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function(){
	new WebPackDevServer(webpack(frontEndConfig), {
		publicPath: frontEndConfig.output.publicPath,
		stats: 'errors-only'
	}).listen(3000, 'localhost', function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log('webpack dev server listening at localhost:3000');
		}
	})
});

gulp.task('backend-build', function(done) {
	webpack(webBackendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function(done) {
	var firedDone = false;
	webpack(webBackendConfig).watch(100, function() {
		if(!firedDone) {
			firedDone = true;
			done();
		}

		nodemon.restart();
	})
});

gulp.task('move-static', function() {
	return gulp.src([staticGlob, '!./src/web/public/**/*.js', '!./src/web/public/app/**/*'])
		.pipe(gulp.dest(destination + '/public'))
});

gulp.task('generate-todo', function() {
	return gulp.src(jsSourceGlob)
		.pipe(todo())
		.pipe(gulp.dest('./'));
});

gulp.task('build', ['frontend-build', 'backend-build', 'move-static']);

gulp.task('lint', function() {
    //TODO this needs to be improved. subsequent tasks still execute
    function errorHandler(err) {
        console.log('failure in pipe', err);
        this.emit('end');
    }

	return gulp.src(allJs)
		.pipe(plumber(errorHandler))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('watch-lint', ['lint'], function() {
	gulp.watch(allJs, ['lint']);
});

gulp.task('watch', ['frontend-watch', 'backend-watch', 'move-static'], function() {
	nodemon({
		execMap: {
			js: 'node'
		},
		script: path.resolve(__dirname, 'dist/backend'),
		ignore: ['*'],
		watch: ['foo/'],
		ext: 'noop'
	}).on('restart', function() {
		console.log('Patched!');
	});
});