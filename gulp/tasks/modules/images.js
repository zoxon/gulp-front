'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var path = require('path');
var config = require('../../config.js');
var options = {
	plumber: config.plumber(),
	imagemin: config.imagemin(),
	postcss: config.postcss()
};


module.exports = function() {
	return function() {
		return gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/images' })
			.pipe(plumber(options.plumber))
			.pipe(rename(function(file) {
				var f = path.parse(file.dirname);
				var f2 = path.parse(f.dir);
				var moduleName = f2.base;

				file.dirname = '';
				file.basename = moduleName + '__' + file.basename;

			}))
			.pipe(changed('dest/assets/images'))
			.pipe(imagemin(options.imagemin.images))
			.pipe(gulp.dest('dest/assets/images'));
	};
};

