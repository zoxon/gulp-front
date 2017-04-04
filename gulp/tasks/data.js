'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var yaml = require('gulp-yaml');
var mergeJson = require('gulp-merge-json');


module.exports = function(options) {
	return function() {
		return gulp.src([ '**/*.yml', '!**/_*.yml' ], { cwd: 'source/modules/*/data' })
			.pipe(plumber(options.plumber))
			.pipe(yaml({ space: '\t' }))
			.pipe(mergeJson({ fileName: 'data.json' }))
			.pipe(gulp.dest('tmp'));
	}
}
