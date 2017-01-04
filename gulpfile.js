var gulp = require('gulp');
var todo = require('gulp-todo');
var del = require('del');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var path = require('path');


var jsSourceGlob = './src/!(public)/*.js';
var staticGlob = './src/web/public/**';
var allJs = './src/**/*.js';
var destination = './dist';
var public = '/public';


gulp.task('clean-web', function () {
	//clear out all distribution folder
	return del('./dist-web');
});

gulp.task('generate-todo', function () {
	return gulp.src(jsSourceGlob)
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


gulp.task('move-static', function () {
	return gulp.src([staticGlob, '!./src/web/public/**/*.js', '!./src/web/public/app/**/*'])
		.pipe(gulp.dest(destination + '/public'))
});

//each one needs common and package.json

var commonPath = './src/common/**/*'

gulp.task('bundle-common', function() {
	return gulp.src([commonPath])
		.pipe(gulp.dest('./dist-web/common'))
})

gulp.task('bundle-web', ['clean-web'], function() {
	gulp.src([commonPath])
		.pipe(gulp.dest('./dist-web/common'))

	gulp.src(['./src/seedScripts/**/*', './src/seedScripts/.env'])
		.pipe(gulp.dest('./dist-web/seedScripts'))

	gulp.src(['./package.json'])
		.pipe(gulp.dest('./dist-web'))

	return gulp.src(['./src/web/**/*', '!./src/web/client/**/*', './src/web/**/.env'])
		.pipe(gulp.dest('./dist-web/web'));
})

gulp.task('bundle-service', function() {
	gulp.src([commonPath])
		.pipe(gulp.dest('./dist-service/common'))

	gulp.src(['./package.json'])
		.pipe(gulp.dest('./dist-service'));

	return gulp.src(['./src/fileService/**/*', './src/fileService/**/.env'])
		.pipe(gulp.dest('./dist-service/fileService'));
})