'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var include = require('gulp-include');
var config = require('../config.js');
var options = {
	plumber: config.plumber(),
	include: config.include()
};

module.exports = function() {
	return function() {
		return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts' })
			.pipe(plumber(options.plumber))
			.pipe(include(options.include))
			.pipe(gulp.dest('dest/assets/javascripts'));
	};
};
