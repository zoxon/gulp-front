'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy:publish', function() {
	return gulp.src('**/*', { cwd: 'dest' })
		.pipe(ghPages(options.ghPages));
});
