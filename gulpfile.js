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


gulp.task('clean', function () {
	//clear out all distribution folder
	return del(destination);
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

var distPath = './dist'
var commonPath = './src/common/**/*'

gulp.task('bundle-common', function() {
	return gulp.src([commonPath])
		.pipe(gulp.dest('./dist/common'))
})

gulp.task('bundle-web', function() {
	//each one needs common, webpack bundle is already in dist/web

	// gulp.src([commonPath])
	// 	.pipe(gulp.dest('./dist/web/common'))

	return gulp.src(['./src/web/**/*', '!./src/web/client/**/*', './package.json', './deploy/web.config'])
		.pipe(gulp.dest('./dist/web'));
})

gulp.task('bundle-seed-scripts', function() {

})

gulp.task('bundle-file-service', function() {

})

// gulp.task('watch', ['frontend-watch', 'web-backend-watch', 'move-static'], function () {
// 	nodemon({
// 		execMap: {
// 			js: 'node'
// 		},
// 		script: path.resolve(__dirname, 'dist/backend'),
// 		ignore: ['*'],
// 		watch: ['foo/'],
// 		ext: 'noop'
// 	}).on('restart', function () {
// 		console.log('Patched!');
// 	});
// });