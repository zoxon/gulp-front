'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var browserSync = require('browser-sync').create();


gulp.task('serve', function() {
	return browserSync.init(options.browserSync);
});
