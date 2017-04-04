'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').get('default');


module.exports = function() {
	return function(callback) {
		global.watch = true;

		// Modules, pages
		var templates = watch('source/**/*.pug', function() {
			return gulp.start('build:pages');
		});

		// Modules data
		watch([ 'source/modules/*/data/*.yml' ], function() {
			return gulp.start('build:html');
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
			return gulp.start('build:scripts');
		});

		// Modules scripts
		watch('source/modules/*/*.js', function() {
			return gulp.start('build:scripts');
		});

		// Modules images
		watch('source/modules/*/assets/**/*.{jpg,gif,svg,png}', function() {
			return gulp.start('modules:assets');
		});

		// Static files
		watch('source/static/assets/**/*', function() {
			return gulp.start('build:assets');
		});

		// Svg icons
		watch('source/static/icons/**/*.svg', function() {
			return runSequence('build:icons', 'build:css');
		});

		// Png sprites
		watch('source/static/sprite/**/*.png', function() {
			return gulp.start('build:sprite');
		});
	}
}

