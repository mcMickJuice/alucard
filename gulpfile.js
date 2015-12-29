var gulp = require('gulp');
var babel = require('gulp-babel');
var todo = require('gulp-todo');
var del = require('del');

var jsSourceGlob = './src/**/*.js';

gulp.task('clean', function() {
	//clear out all distribution folder
	return del('./dist');
})

gulp.task('generate-todo', function() {
	return gulp.src(jsSourceGlob)
		.pipe(todo())
		.pipe(gulp.dest('./'))
})

gulp.task('move-data', function() {
	return gulp.src('./src/data/seedConsoleData.json')
		.pipe(gulp.dest('./dist/data'));
})

gulp.task('babelify', function() {
	console.log('Running babelify')
	return gulp.src(jsSourceGlob)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist'));
})

gulp.task('default', ['clean', 'generate-todo', 'babelify', 'move-data'], function() {
	console.log('done!')
})