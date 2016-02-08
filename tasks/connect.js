'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('connect', ['html','scripts','sass'], function() {
  return plugins.connect.server({
    root: 'dist',
    port: 8000,
  });
});