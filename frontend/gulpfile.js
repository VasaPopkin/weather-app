var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify');
var gulpLess = require('gulp-less');
var browserify = require('browserify');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var source = require('vinyl-source-stream');
var mainBowerFiles = require('main-bower-files');

gulp.task('css', function() {
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('public/css'))
});

gulp.task('app', function() {
	return browserify({
		entries: './app/js/index.js'
	}).transform(babelify)
	.bundle()
    .on('error', function(err){
        gutil.log(gutil.colors.red.bold('[browserify error]'));
        gutil.log(err.message);
        this.emit('end');
    })
	.pipe(source('index.js'))
	.pipe(gulp.dest('public/js'))

});

gulp.task('vendor', function() {
	gulp.src(mainBowerFiles())
        .pipe(gulpFilter('**\/*.js'))
        .pipe(gulpConcat('vendor.js'))
        .pipe(gulp.dest('public/js'))

	gulp.src(mainBowerFiles())
        .pipe(gulpFilter('**\/*.css'))
        .pipe(gulpConcat('vendor.css'))
        .pipe(gulp.dest('public/css'))

    gulp.src(mainBowerFiles())
        .pipe(gulpFilter("**\/*.less"))
        .pipe(gulpLess())
        .pipe(gulpConcat('less-vendor.css'))
        .pipe(gulp.dest('public/css'));

    gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('public/fonts'));
})

gulp.task('watch', function() {
	gulp.watch('app/js/**/**/*', ['app']);
	gulp.watch('app/css/*.css', ['css']);
})

gulp.task('production', ['vendor', 'app', 'css']);