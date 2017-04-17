'use strict';

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var config = require('../config.js');
var options = {
	ghPages: config.ghPages()
};

module.exports = function() {
	return function() {
		return gulp.src('**/*', { cwd: 'dest' })
			.pipe(ghPages(options.ghPages));
	};
};
