'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var plumber = require('gulp-plumber');
var include = require('gulp-include');


gulp.task('build:scripts', function() {
	return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts' })
		.pipe(plumber(options.plumber))
		.pipe(include(options.include))
		.pipe(gulp.dest('dest/assets/javascripts'));
});
