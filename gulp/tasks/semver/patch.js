'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');


module.exports = function(options) {
	return function() {
		return gulp.src('package.json')
			.pipe(bump())
			.pipe(gulp.dest('./'));
	}
}
