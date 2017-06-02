	var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),

	port = process.env.port || 5000 ;

	gulp.task('browserify',function(){
		gulp.src('./src/app/js/main.js')
		.pipe(browserify({
			transform:'reactify',
		}))
		.pipe(gulp.dest('./src/dist/js'))
	});

	gulp.task('connect',function(){
		connect.server({
			root:'./src',
			port:port,
			livereload:true,
		})
	});

	gulp.task('js',function(){
		gulp.src('./src/dist/**/*.js')
		.pipe(connect.reload())
	});

	gulp.task('html',function(){
		gulp.src('./src/app/**/*.html')
		.pipe(connect.reload())
	});

	gulp.task('watch',function(){
		gulp.watch('./src/dist/**/*.js',['js']);
		gulp.watch('./src/app/**/*.html',['html']);
		gulp.watch('./src/app/**/*.js',['browserify']);
	});

	gulp.task('default',['browserify']);

	gulp.task('server',['browserify','connect','watch']);
