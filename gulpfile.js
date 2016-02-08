'use strict';

var gulp = require('gulp');
require('require-dir')('./tasks');

gulp.task('start', ['connect']);
gulp.task('default', ['start']);

