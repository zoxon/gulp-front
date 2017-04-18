'use strict';

var gulp = require('gulp');
var browserSync = require('../util/get-bs-instance.js');
var reload = browserSync.reload;


module.exports = function() {
	return function() {

		// Modules, pages
		gulp.watch(
			'source/**/*.pug',
			gulp.series('build:pages', reload)
		);

		// Modules data
		gulp.watch(
			'source/modules/*/data/*.yml',
			gulp.series('build:html', reload)
		);

		// Static styles
		gulp.watch(
			'source/static/styles/**/*.styl',
			gulp.series('build:css')
		);

		// Modules styles
		gulp.watch(
			'source/modules/**/*.styl',
			gulp.series('build:css')
		);

		// Static scripts
		gulp.watch(
			'source/static/scripts/**/*.js',
			gulp.series('build:scripts', reload)
		);

		// Modules scripts
		gulp.watch(
			'source/modules/*/*.js',
			gulp.series('build:scripts', reload)
		);

		// Modules images
		gulp.watch(
			'source/modules/*/assets/**/*.{jpg,gif,svg,png}',
			gulp.series('modules:assets', reload)
		);

		// Static files
		gulp.watch(
			'source/static/assets/**/*',
			gulp.series('build:assets', reload)
		);

		// Svg icons
		gulp.watch(
			'source/static/icons/**/*.svg',
			gulp.series('build:icons', 'build:css', reload)
		);

		// Png sprites
		gulp.watch(
			'source/static/sprite/**/*.png',
			gulp.series('build:sprite', reload)
		);
	};
};
