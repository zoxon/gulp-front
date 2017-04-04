'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');


module.exports = function(options) {
	return function() {
		return gulp.src('**/*', { cwd: 'dest' })
			.pipe(ghPages(options.ghPages));
	}
}
