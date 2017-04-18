'use strict';

var gulp = require('gulp');

module.exports = function() {
	return gulp.series(
		'build:data',
		'build:pages'
	);
};
