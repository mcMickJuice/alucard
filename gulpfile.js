var gulp = require('gulp');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var todo = require('gulp-todo');
var del = require('del');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');

var jsSourceGlob = './src/!(public)/*.js';
var staticGlob = './src/public/**';
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

gulp.task('webpack', shell.task([
	'webpack'
]));

//gulp.task('webpack-dev-server', function(cb) {
//    var config = require('./webpack.config.js');
//    var devConfig = Object.create(config);
//
//    new WebPackDevServer(webpack(devConfig), {})
//        .listen(8080, 'localhost', function(err) {
//            if(err) throw new gutil.PluginError('webpack-dev-server', err);
//
//            gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
//            cb();
//        })
//})

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
		['generate-todo','build', 'babelify', 'webpack'],
	cb);
});