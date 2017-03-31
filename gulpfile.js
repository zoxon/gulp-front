'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var spritesmith = require('gulp.spritesmith');


// Read json and return object
var getJsonData = require('./gulp/util/get-json-data.js');

var correctNumber = require('./gulp/util/correct-number.js');

// Return timestamp
var getTimestamp = require('./gulp/util/get-timestamp.js');

// Plugins options
var options = require('./gulp/options.js')

gulp.task('cleanup', function(cb) {
	return del(options.del, cb);
});

gulp.task('serve', function() {
	return browserSync.init(options.browserSync);
});


gulp.task('build:css', function() {
	return gulp.src([ '*.styl', '!_*.styl' ], { cwd: 'source/static/styles' })
		.pipe($.plumber(options.plumber))
		.pipe($.stylus(options.stylus))
		.pipe($.combineMq({ beautify: true }))
		.pipe($.postcss(options.postcss))
		.pipe(gulp.dest('dest/assets/stylesheets'))
		.pipe(browserSync.reload({
			stream: true,
			match: '**/*.css'
		}));
});

gulp.task('build:data', function() {
	return gulp.src([ '**/*.yml', '!**/_*.yml' ], { cwd: 'source/modules/*/data' })
		.pipe($.plumber(options.plumber))
		.pipe($.yaml({ space: '\t' }))
		.pipe($.mergeJson({ fileName: 'data.json' }))
		.pipe(gulp.dest('tmp'));
});

gulp.task('build:pages', function() {
	var jsonData = getJsonData('./tmp/data.json');

	options.pug.locals = jsonData;

	return gulp.src([ '**/*.pug', '!**/_*.pug' ], { cwd: 'source/pages' })
		.pipe($.plumber(options.plumber))
		.pipe($.pug(options.pug))
		.pipe($.posthtml(options.posthtml.plugins, options.posthtml.options))
		.pipe($.prettify(options.htmlPrettify))
		.pipe(gulp.dest('dest'));
});

gulp.task('modules:assets', function() {
	return gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/assets' })
		.pipe($.plumber(options.plumber))
		.pipe($.changed('dest/assets/images'))
		.pipe($.imagemin(options.imagemin.images))
		.pipe($.flatten())
		.pipe(gulp.dest('dest/assets/images'));
});

gulp.task('build:assets', function() {
	var imageFilter = $.filter('**/*.{jpg,gif,svg,png}', { restore: true });

	return gulp.src([ '**/*.*', '!**/_*.*' ], { cwd: 'source/static/assets' })
		.pipe($.plumber(options.plumber))
		.pipe($.changed('dest/assets'))

		// Minify images
		.pipe(imageFilter)
		.pipe($.changed('dest/assets'))
		.pipe($.imagemin(options.imagemin.images))
		.pipe(imageFilter.restore)

		// Copy other files
		.pipe(gulp.dest('dest/assets'));
});

gulp.task('build:scripts', function() {
	return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts' })
		.pipe($.plumber(options.plumber))
		.pipe($.include(options.include))
		.pipe(gulp.dest('dest/assets/javascripts'));
});

gulp.task('build:icons', function() {
	return gulp.src([ '**/*.svg', '!**/_*.svg' ], { cwd: 'source/static/icons' })
		.pipe($.plumber(options.plumber))
		.pipe($.imagemin(options.imagemin.icons))
		.pipe($.svgSymbols(options.svgSymbols))
		.pipe($.if(/\.styl$/, gulp.dest('tmp')))
		.pipe($.if(/\.svg$/, $.rename('icons.svg')))
		.pipe($.if(/\.svg$/, gulp.dest('dest/assets/images')));
});

gulp.task('build:sprite', function() {
	var spriteData = gulp.src([ '**/*.png', '!**/_*.png' ], { cwd: 'source/static/sprite' })
		.pipe(spritesmith(options.spritesmith));

	spriteData.img.pipe(buffer())
		.pipe($.imagemin(options.imagemin.images))
		.pipe(gulp.dest('dest/assets/images'));

	spriteData.css.pipe(buffer())
		.pipe(gulp.dest('tmp'));

	return spriteData.img.pipe(buffer());
});

// Semver
gulp.task('semver:patch', function() {
	return gulp.src('package.json')
		.pipe($.bump())
		.pipe(gulp.dest('./'));
});

gulp.task('semver:minor', function() {
	return gulp.src('package.json')
		.pipe($.bump({ type: 'minor' }))
		.pipe(gulp.dest('./'));
});

gulp.task('semver:major', function() {
	return gulp.src('package.json')
		.pipe($.bump({ type: 'major' }))
		.pipe(gulp.dest('./'));
});

gulp.task('semver:reset', function() {
	return gulp.src('package.json')
		.pipe($.bump({ version: '0.1.0' }))
		.pipe(gulp.dest('./'));
});

gulp.task('build:zip', function() {
	var datetime = '-' + getTimestamp();
	var zipName = 'dist' + datetime + '.zip';

	return gulp.src('dest/**/*')
		.pipe($.zip(zipName))
		.pipe(gulp.dest('zip'));
});

gulp.task('deploy:publish', function() {
	return gulp.src('**/*', { cwd: 'dest' })
		.pipe($.ghPages({ branch: 'build' }));
});

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
	$.watch('source/**/*.pug', function() {
		return runSequence('build:pages', browserSync.reload);
	});

	// Modules data
	$.watch([ 'source/modules/*/data/*.yml' ], function() {
		return runSequence('build:html', browserSync.reload);
	});

	// Static styles
	$.watch('source/static/styles/**/*.styl', function() {
		return gulp.start('build:css');
	});

	// Modules styles
	$.watch('source/modules/**/*.styl', function() {
		return gulp.start('build:css');
	});

	// Static scripts
	$.watch('source/static/scripts/**/*.js', function() {
		return runSequence('build:scripts', browserSync.reload);
	});

	// Modules scripts
	$.watch('source/modules/*/*.js', function() {
		return runSequence('build:scripts', browserSync.reload);
	});

	// Modules images
	$.watch('source/modules/*/assets/**/*.{jpg,gif,svg,png}', function() {
		return runSequence('modules:assets', browserSync.reload);
	});

	// Static files
	$.watch('source/static/assets/**/*', function() {
		return runSequence('build:assets', browserSync.reload);
	});

	// Svg icons
	$.watch('source/static/icons/**/*.svg', function() {
		return runSequence('build:icons', 'build:css', browserSync.reload);
	});

	// Png sprites
	$.watch('source/static/sprite/**/*.png', function() {
		return runSequence('build:sprite', browserSync.reload);
	});
});

gulp.task('default', function() {
	gulp.start('build');
});
