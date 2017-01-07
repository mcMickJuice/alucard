var gulp = require('gulp');
var todo = require('gulp-todo');
var del = require('del');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');


var allJs = './src/**/*.js';


gulp.task('clean-web', function () {
	//clear out all distribution folder
	return del('./dist-web');
});

gulp.task('generate-todo', function () {
	return gulp.src(allJs)
		.pipe(todo())
		.pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
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

gulp.task('watch-lint', ['lint'], function () {
	gulp.watch(allJs, ['lint']);
});

gulp.task('bundle-seedScripts', function () {
	return gulp.src(['./src/seedScripts/**/*', './src/seedScripts/.env'])
		.pipe(gulp.dest('./dist-seed'))
})

gulp.task('bundle-web', ['clean-web'], function () {
	return gulp.src(['./src/web/**/*', '!./src/web/client/**/*', './src/web/**/.env', './package.json'])
		.pipe(gulp.dest('./dist-web'));
})

gulp.task('bundle-service', function () {

	// gulp.src(['./package.json'])
	// 	.pipe(gulp.dest('./dist-service'));

	return gulp.src(['./src/fileService/**/*', './src/fileService/**/.env', './package.json'])
		.pipe(gulp.dest('./dist-service'));
})