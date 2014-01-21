var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('styles', function () {
  gulp.src('less/main.less')
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles', 'scripts'], function(){
  gulp.watch('src/**/*.js', function(event) {
    gulp.run('scripts');
  });

  gulp.watch('less/**/*.less', function(event) {
    gulp.run('styles');
  });
});
