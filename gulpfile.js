'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// Load all tasks
var modules = requireDir('./gulp/tasks');

// Service tasks
gulp.task('build:html', function(cb) {
	return runSequence(
		'build:data',
		'build:pages',
		cb
	);
});

// Main tasks
gulp.task('build', function(cb) {
	return runSequence(
		'cleanup',
		[
			'build:html',
			'build:icons',
			'build:sprite',
			'modules:assets',
			'build:assets',
			'build:scripts'
		],
		'build:css',
		cb
	);
});

gulp.task('zip', function(cb) {
	return runSequence(
		'build',
		'build:zip',
		cb
	);
});

gulp.task('deploy', function(cb) {
	return runSequence(
		'build',
		'deploy:publish',
		cb
	);
});

gulp.task('dev', function(cb) {
	return runSequence(
		'build',
		[
			'serve',
			'watch'
		],
		cb
	);
});

gulp.task('watch', function() {

	// Modules, pages
	watch('source/**/*.pug', function() {
		return runSequence('build:pages', browserSync.reload);
	});

	// Modules data
	watch([ 'source/modules/*/data/*.yml' ], function() {
		return runSequence('build:html', browserSync.reload);
	});

	// Static styles
	watch('source/static/styles/**/*.styl', function() {
		return gulp.start('build:css');
	});

	// Modules styles
	watch('source/modules/**/*.styl', function() {
		return gulp.start('build:css');
	});

	// Static scripts
	watch('source/static/scripts/**/*.js', function() {
		return runSequence('build:scripts', browserSync.reload);
	});

	// Modules scripts
	watch('source/modules/*/*.js', function() {
		return runSequence('build:scripts', browserSync.reload);
	});

	// Modules images
	watch('source/modules/*/assets/**/*.{jpg,gif,svg,png}', function() {
		return runSequence('modules:assets', browserSync.reload);
	});

	// Static files
	watch('source/static/assets/**/*', function() {
		return runSequence('build:assets', browserSync.reload);
	});

	// Svg icons
	watch('source/static/icons/**/*.svg', function() {
		return runSequence('build:icons', 'build:css', browserSync.reload);
	});

	// Png sprites
	watch('source/static/sprite/**/*.png', function() {
		return runSequence('build:sprite', browserSync.reload);
	});
});

gulp.task('default', function() {
	gulp.start('build');
});
