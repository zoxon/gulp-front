'use strict';

var gulp = require('gulp');

module.exports = function() {
	return gulp.series(
		'build',
		'build:zip'
	);
};
