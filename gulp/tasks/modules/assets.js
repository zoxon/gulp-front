'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten');

module.exports = function(options) {
	return function() {
		return gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/assets' })
			.pipe(plumber(options.plumber))
			.pipe(changed('dest/assets/images'))
			.pipe(imagemin(options.imagemin.images))
			.pipe(flatten())
			.pipe(gulp.dest('dest/assets/images'));
	}
}

