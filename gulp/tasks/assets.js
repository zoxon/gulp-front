'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var config = require('../config.js');
var options = {
	plumber: config.plumber(),
	imagemin: config.imagemin()
};

module.exports = function() {
	return function() {
		var imageFilter = filter('**/*.{jpg,gif,svg,png}', { restore: true });

		return gulp.src([ '**/*.*', '!**/_*.*' ], { cwd: 'source/static/assets' })
			.pipe(plumber(options.plumber))
			.pipe(changed('dest/assets'))

			// Minify images
			.pipe(imageFilter)
			.pipe(changed('dest/assets'))
			.pipe(imagemin(options.imagemin.images))
			.pipe(imageFilter.restore)

			// Copy other files
			.pipe(gulp.dest('dest/assets'));
	};
};
