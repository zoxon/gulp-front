'use strict';
var gulp = require('gulp');

module.exports = function() {
	return gulp.series(
		'cleanup',
		gulp.series(
			gulp.parallel(
				'build:html',
				'build:icons',
				'build:sprite',
				'modules:assets',
				'build:assets',
				'build:scripts'
			),
			'build:css'
		)
	);
};
