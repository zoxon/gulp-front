'use strict';

var gulp = require('gulp');

module.exports = function() {
	return gulp.series(
		'build',
		gulp.parallel(
			'serve',
			'watch'
		)
	);
};
