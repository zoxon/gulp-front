'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten');
var config = require('../../config.js');
var options = {
	plumber: config.plumber(),
	imagemin: config.imagemin(),
	postcss: config.postcss()
};


module.exports = function() {
	return function() {
		return gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/assets' })
			.pipe(plumber(options.plumber))
			.pipe(changed('dest/assets/images'))
			.pipe(imagemin(options.imagemin.images))
			.pipe(flatten())
			.pipe(gulp.dest('dest/assets/images'));
	};
};

