'use strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer-stylus');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var bump = require('gulp-bump');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var data = require('gulp-data');
var del = require('del');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var gcmq = require('gulp-combine-mq');
var gulpif = require('gulp-if');
var gulpJade = require('gulp-jade');
var gulpZip = require('gulp-zip');
var gutil = require('gulp-util');
var htmlPrettify = require('gulp-prettify');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var include = require('gulp-include');
var jade = require('jade');
var jstransformer = require('jstransformer');
var jstransformerStylus = require('jstransformer-stylus');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var rupture = require('rupture');
var spritesmith = require('gulp.spritesmith');
var stylus = require('gulp-stylus');
var svgSymbols = require('gulp-svg-symbols');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var cached = require('gulp-cached');
var jadeInheritance = require('gulp-jade-inheritance');


// Error handler for gulp-plumber
var errorHandler = function (err) {
	gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));

	if (gutil.env.beep) {
		gutil.beep();
	}

	this.emit('end');
};

// Print object in console
var debugObj = function (obj) {
	var util = require('util');
	console.log(util.inspect(obj, {showHidden: false, depth: null}));
};

// Read file and return object
var getData = function getData (file) {
	var dataEntry;
	var data;
	var fs = require('fs');

	try {
		dataEntry = fs.readFileSync(file, 'utf8');
	} catch (er) {
		dataEntry = false;
	}

	if (dataEntry) {
		eval('data = {' + dataEntry + '}');
	} else {
		data = '{}';
	}

	return data;
};

var correctNumber = function correctNumber(number) {
	return number < 10 ? '0' + number : number;
};

// Return timestamp
var getDateTime = function getDateTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = correctNumber(now.getMonth() + 1);
	var day = correctNumber(now.getDate());
	var hours = correctNumber(now.getHours());
	var minutes = correctNumber(now.getMinutes());
	return year + '-' + month + '-' + day + '-' + hours + minutes;
};

// Plugins options
var options = {
	del: [
		'dest',
		'tmp'
	],

	plumber: {
		errorHandler: errorHandler
	},

	browserSync: {
		server: {
			baseDir: './dest'
		}
	},

	stylus: {
		use: [
			rupture(),
			autoprefixer({
				cascade: false
			})
		]
	},

	cssbeautify: {
		indent: '\t',
		autosemicolon: true
	},

	jade: {
		jade: jade,
		pretty: '\t'
	},

	htmlPrettify: {
		'unformatted': ['pre', 'code'],
		'indent_with_tabs': true,
		'preserve_newlines': true,
		'brace_style': 'expand',
		'end_with_newline': true
	},

	svgSymbols: {
		title: false,
		id: '%f',
		className: '%f',
		templates: [
			path.join(__dirname, 'source/static/styles/templates/icons-template.styl'),
			path.join(__dirname, 'source/static/styles/templates/icons-template.svg')
		]
	},

	spritesmith: {
		retinaSrcFilter: '**/*@2x.png',
		imgName: 'sprite.png',
		retinaImgName: 'sprite@2x.png',
		cssName: 'sprite.styl',
		algorithm: 'binary-tree',
		padding: 8,
		cssTemplate: './source/static/styles/templates/sprite-template.mustache'
	},

	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [
			imageminPngquant()
		]
	}
};

gulp.task('cleanup', function (cb) {
	return del(options.del, cb);
});

gulp.task('browser-sync', function() {
	return browserSync.init(options.browserSync);
});

gulp.task('bs-reload', function (cb) {
	browserSync.reload();
});

gulp.task('combine-modules-styles', function (cb) {
	return gulp.src(['**/*.styl', '!**/_*.styl'], {cwd: 'source/modules'})
		.pipe(plumber(options.plumber))
		.pipe(concat('modules.styl'))
		.pipe(gulp.dest('tmp'));
});

gulp.task('compile-styles', function (cb) {
	return gulp.src(['*.styl', '!_*.styl'], {cwd: 'source/static/styles'})
		.pipe(plumber(options.plumber))
		.pipe(stylus(options.stylus))
		.pipe(gcmq({beautify: false}))
		.pipe(cssbeautify(options.cssbeautify))
		.pipe(csscomb())
		.pipe(gulp.dest('dest/css'))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dest/css'))
		.pipe(browserSync.stream());
});

gulp.task('combine-modules-data', function (cb) {
	return gulp.src(['**/*.js', '!**/_*.js'], {cwd: 'source/modules/*/data'})
		.pipe(plumber(options.plumber))
		.pipe(concat('data.js', { newLine: ',\n\n' }))
		.pipe(gulp.dest('tmp'));
});


jade.filters.stylus = jstransformer(jstransformerStylus);
jade.filters.shoutFilter = function (str) {
	return str + '!!!!';
}

gulp.task('compile-pages', function (cb) {
	return gulp.src(['**/*.jade', '!**/_*.jade'], {cwd: 'source/pages'})
		.pipe(plumber(options.plumber))
		// .pipe(cached('templates'))
		// .pipe(gulpif(global.isWatching, jadeInheritance({basedir: 'source'})))
		// .pipe(filter(function (file) {
		// 	return !/source[\\\/]modules/.test(file.path);
		// }))
		.pipe(data(getData('tmp/data.js')))
		.pipe(gulpJade(options.jade))
		.pipe(htmlPrettify(options.htmlPrettify))
		// .pipe(flatten())
		.pipe(gulp.dest('dest'));
});

gulp.task('copy-modules-img', function (cb) {
	return gulp.src('**/*.{jpg,gif,svg,png}', {cwd: 'source/modules/*/assets'})
		.pipe(plumber(options.plumber))
		.pipe(changed('dest/img'))
		.pipe(imagemin(options.imagemin))
		.pipe(flatten())
		.pipe(gulp.dest('dest/img'));
});

gulp.task('combine-modules-scripts', function (cb) {
	return gulp.src(['*.js', '!_*.js'], {cwd: 'source/modules/*'})
		.pipe(plumber(options.plumber))
		.pipe(concat('modules.js', { newLine: '\n\n' }))
		.pipe(gulp.dest('tmp'));
});

gulp.task('copy-assets', function (cb) {
	var imageFilter = filter('**/*.{jpg,gif,svg,png}', {restore: true});
	var scriptsFilter = filter(['**/*.js', '!**/*.min.js'], {restore: true});
	var stylesFilter = filter(['**/*.css', '!**/*.min.css'], {restore: true});

	return gulp.src(['**/*.*', '!**/_*.*'], {cwd: 'source/static/assets'})
		.pipe(plumber(options.plumber))
		.pipe(changed('dest'))

		// Minify images
		.pipe(imageFilter)
		.pipe(changed('dest'))
		.pipe(imagemin(options.imagemin))
		.pipe(imageFilter.restore)

		// Minify JavaScript files
		.pipe(scriptsFilter)
		.pipe(gulp.dest('dest'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(scriptsFilter.restore)

		// Minify css
		.pipe(stylesFilter)
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(stylesFilter.restore)

		// Copy other files
		.pipe(gulp.dest('dest'));
});

gulp.task('combine-scripts', function (cb) {
	return gulp.src(['*.js', '!_*.js'], {cwd: 'source/static/scripts'})
		.pipe(plumber(options.plumber))
		.pipe(include())
		.pipe(gulp.dest('dest/js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dest/js'));
});

gulp.task('combine-svg-icons', function (cb) {
	return gulp.src(['**/*.svg', '!**/_*.svg'], {cwd: 'source/static/icons'})
		.pipe(plumber(options.plumber))
		.pipe(imagemin(options.imagemin))
		.pipe(svgSymbols(options.svgSymbols))
		.pipe(gulpif(/\.styl$/, gulp.dest('tmp')))
		.pipe(gulpif(/\.svg$/, rename('icons.svg')))
		.pipe(gulpif(/\.svg$/, gulp.dest('dest/img')));
});

gulp.task('combine-png-sprite', function (cb) {
	var spriteData = gulp.src(['**/*.png', '!**/_*.png'], {cwd: 'source/static/sprite'})
		.pipe(spritesmith(options.spritesmith));

	spriteData.img.pipe(buffer()).pipe(imagemin()).pipe(gulp.dest('dest/img'));
	spriteData.css.pipe(buffer()).pipe(gulp.dest('tmp'));

	return spriteData.img.pipe(buffer());
});

// Semver
gulp.task('patch', function () {
	return gulp.src('package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('minor', function () {
	return gulp.src('package.json')
		.pipe(bump({ type: 'minor' }))
		.pipe(gulp.dest('./'));
});

gulp.task('major', function () {
	return gulp.src('package.json')
		.pipe(bump({ type: 'major' }))
		.pipe(gulp.dest('./'));
});

gulp.task('semver:reset', function () {
	return gulp.src('package.json')
		.pipe(bump({ version: '0.1.0' }))
		.pipe(gulp.dest('./'));
});

gulp.task('build-zip', function() {
	var datetime = '-' + getDateTime();
	var zipName = 'dist' + datetime + '.zip';

	return gulp.src('dest/**/*')
		.pipe(gulpZip(zipName))
		.pipe(gulp.dest('zip'));
});

gulp.task('build-html', function (cb) {
	return runSequence(
		'combine-modules-data',
		'compile-pages',
		cb
	);
});

gulp.task('build-css', function (cb) {
	return runSequence(
		'combine-modules-styles',
		'compile-styles',
		cb
	);
});

gulp.task('build-js', function (cb) {
	return runSequence(
		'combine-modules-scripts',
		'combine-scripts',
		cb
	);
});

gulp.task('build', function (cb) {
	return runSequence(
		'cleanup',
		[
			'build-html',
			'combine-svg-icons',
			'combine-png-sprite',
			'copy-modules-img',
			'copy-assets',
			'build-js',
		],
		'build-css',
		cb
	);
});

gulp.task('zip', function (cb) {
	return runSequence(
		'build',
		'build-zip',
		cb
	);
});

gulp.task('develop', function (cb) {
	return runSequence(
		'build',
		'browser-sync',
		cb
	);
});

gulp.task('dev', ['develop'], function (cb) {
	global.isWatching = true;

	// Modules, pages
	watch('source/**/*.jade', function() {
		return runSequence('compile-pages', browserSync.reload);
	});

	// Modules data
	watch('source/modules/*/data/*.js', function() {
		return runSequence('build-html', browserSync.reload);
	});

	// Static styles
	watch('source/static/styles/**/*.styl', function() {
		// return runSequence('compile-styles');
		gulp.start('compile-styles');
	});

	// Modules styles
	watch('source/modules/**/*.styl', function() {
		// return runSequence('build-css');
		gulp.start('build-css');
	});

	// Static scripts
	watch('source/static/scripts/**/*.js', function() {
		return runSequence('combine-scripts', browserSync.reload);
	});

	// Modules scripts
	watch('source/modules/*/*.js', function() {
		return runSequence('build-js', browserSync.reload);
	});

	// Modules images
	watch('source/modules/*/assets/**/*.{jpg,gif,svg,png}', function() {
		return runSequence('copy-modules-img', browserSync.reload);
	});

	// Static files
	watch('source/static/assets/**/*', function() {
		return runSequence('copy-assets', browserSync.reload);
	});

	// Svg icons
	watch('source/static/icons/**/*.svg', function() {
		return runSequence('combine-svg-icons', browserSync.reload);
	});

	// Png sprites
	watch('source/static/sprite/**/*.png', function() {
		return runSequence('combine-png-sprite', browserSync.reload);
	});
});
