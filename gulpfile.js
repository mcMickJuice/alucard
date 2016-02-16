var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var todo = require('gulp-todo');
var del = require('del');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var jsSourceGlob = './src/!(public)/*.js';
var staticGlob = './src/public/**';
var allJs = './src/**/*.js';
var destination = './dist';
var public = '/public';
var path = require('path');
var DeepMerge = require('deep-merge');
var fs = require('fs');

gulp.task('clean', function() {
	//clear out all distribution folder
	return del(destination);
});

gulp.task('clean-static', function() {
	return del(destination + public);
});

//gulp.task('webpack', shell.task([
//	'webpack'
//]));

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
			{test: /\.js$/, exclude: thirdParty ,loader: 'babel', query: babelSettings},
		]
	}
};

function config(overrides) {
	return deepMerge(baseWebpackConfig, overrides || {});
}

var frontEndConfig = config(
	{
		entry: [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'./src/public/app/app.js'
		],
		output: {
			path: path.join(__dirname, 'static/build'),
			publicPath: 'http://localhost:3000/build',
			filename: 'frontend.js'
		},
		resolve: {
			alias: {
				toastr_css: __dirname + "/node_modules/angular-toastr/dist/angular-toastr.min.css"
			}
		},
		module: {
			loaders: [
				{test: /\.css$/, exclude: thirdParty,loader: 'style!css'},
				{test: /\.less$/, exclude: thirdParty, loader: 'style!css!less'},
				{test: /\.tmpl.html$/, exclude: thirdParty, loader: 'text'}
			]
		},
		plugins: [
			//new HtmlWebpackPlugin({
			//	template: './src/public/index.html'
			//}),
			new webpack.HotModuleReplacementPlugin({quiet: true})
		]
	}
);

//backend
var nodeModules = fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['bin'].indexOf(x) === -1;
	});

var backendConfig = config({
	entry: [
		'webpack/hot/signal.js',
		'./src/app/main.js'
	],
	target: 'node',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'backend.js'
	},
	node: {
		__dirname: true,
		__filename: true
	},
	externals: [
		function(context, request, callback) {
			var pathStart = request.split('/')[0];
			if(nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
				return callback(null, "commonjs " + request);
			}

			callback();
		}
	],
	recordsPath: path.join(__dirname, 'build/_records'),
	plugins: [
		new webpack.IgnorePlugin(/.(css|less|tmpl.html)$/),
		new webpack.HotModuleReplacementPlugin({quiet: true})
	]
});

function onBuild(done) {
	return function(err, stats) {
		if(err) {
			console.log('Error', err);
		}
		else {
			console.log(stats.toString());
		}

		if(done) {
			done();
		}
	}
}

gulp.task('frontend-build', function(done) {
	webpack(frontEndConfig).run(onBuild(done));
});

gulp.task('backend-build', function(done) {
	webpack(backendConfig).run(onBuild(done));
});

gulp.task('move-static', function() {
	return gulp.src([staticGlob, '!./src/public/**/*.js', '!./src/public/app/**/*'])
		.pipe(gulp.dest(destination + '/public'))
});

gulp.task('generate-todo', function() {
	return gulp.src(jsSourceGlob)
		.pipe(todo())
		.pipe(gulp.dest('./'));
});

gulp.task('babelify', ['lint'] , function() {
	return gulp.src(jsSourceGlob)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(destination));
});

gulp.task('build', ['babelify', 'move-static'], function() {

});

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

gulp.task('default', function(cb) {
	gulp.watch(jsSourceGlob, ['build']);
	gulp.watch(staticGlob, ['move-static']);

	runSequence('clean',
		['generate-todo','build', 'babelify'],
	cb);
});