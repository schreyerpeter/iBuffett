var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('watch', function() {
  gulp.watch(['public/*.js','*.js'], ['mocha']);
});

gulp.task('mocha', function(event) {
  return gulp.src(['public/app.spec.js'], { read: false})
    .pipe(mocha({ reporter : 'spec' }))
    .on('error', gutil.log);
});
