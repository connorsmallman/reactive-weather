'use strict';

var gulp = require('gulp');
var bundler = require('./bundle');
var plugins = require('gulp-load-plugins')();
var watch = require('gulp-watch');

gulp.task('watch', ['start'], function() {
  bundler(true).on('update', function() {
    gulp.start('scripts');
  });

  gulp.watch(['./src/**/*.scss'], ['sass']);
  gulp.watch(['./src/*.html'], ['html']);
  watch(['./src/**/*.js','./src/**/*.scss','./src/**/*.html']).pipe(plugins.connect.reload());
});
