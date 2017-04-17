'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');


module.exports = function() {
	return function() {
		return gulp.src('package.json')
			.pipe(bump({ version: '0.1.0' }))
			.pipe(gulp.dest('./'));
	};
};
