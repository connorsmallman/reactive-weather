'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
  return gulp.src('./src/main.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({browsers: ["last 2 versions", "IE 10"] }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});