'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten');


gulp.task('build:assets', function() {
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
});


gulp.task('modules:assets', function() {
	return gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/assets' })
		.pipe(plumber(options.plumber))
		.pipe(changed('dest/assets/images'))
		.pipe(imagemin(options.imagemin.images))
		.pipe(flatten())
		.pipe(gulp.dest('dest/assets/images'));
});
