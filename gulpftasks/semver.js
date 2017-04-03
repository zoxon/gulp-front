'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');


// Semver
gulp.task('semver:patch', function() {
	return gulp.src('package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('semver:minor', function() {
	return gulp.src('package.json')
		.pipe(bump({ type: 'minor' }))
		.pipe(gulp.dest('./'));
});

gulp.task('semver:major', function() {
	return gulp.src('package.json')
		.pipe(bump({ type: 'major' }))
		.pipe(gulp.dest('./'));
});

gulp.task('semver:reset', function() {
	return gulp.src('package.json')
		.pipe(bump({ version: '0.1.0' }))
		.pipe(gulp.dest('./'));
});
