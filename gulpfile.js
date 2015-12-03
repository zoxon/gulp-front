'use strict';

// Инициализируем плагины
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('autoprefixer-stylus'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	cssbeautify = require('gulp-cssbeautify'),
	gutil = require('gulp-util'),
	newer = require('gulp-newer'),
	include = require('gulp-include'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify'),
	imageminPngquant = require('imagemin-pngquant'),
	jadeInheritance = require('gulp-jade-inheritance'),
	csscomb = require('gulp-csscomb'),
	csso = require('gulp-csso'),
	gulpFilter = require('gulp-filter'),
	prettify = require('gulp-prettify'),
	plumber = require('gulp-plumber');

// Функция обработки ошибок
var errorHandler = function(err) {
	gutil.log([(err.name + ' in ' + err.plugin).bold.red, '', err.message, ''].join('\n'));

	if (gutil.env.beep) {
		gutil.beep();
	}

	this.emit('end');
};

// Имена папок
var config = {
	path: {
		source: 'source',
		dist: 'public',
		assets: 'assets',
		partials: 'blocks',
		js: 'js',
		css: 'css',
		images: 'img'
	}
};

// Настройки плагинов
var plugins = {
	browserSync: {
		options: {
			open: true,
			server: { baseDir: config.path.dist }
		}
	},

	autoprefixer: {
		options: {
			browsers: ['last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: false
		}
	},

	stylus: {
		options: {}
	},

	cssbeautify: {
		options: {
			indent: '	',
			autosemicolon: true
		}
	},

	jade: {
		options: {
			pretty: '\t',
			basedir: config.path.source
		}
	},

	jadeInheritance: {
		options: {basedir: config.path.source}
	},

	imagemin: {
		options: {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imageminPngquant()]
		}
	},

	rename: {
		options: {
			suffix: ".min"
		}
	},

	prettify: {
		options: {
			"unformatted": ["pre", "code"],
			"indent_with_tabs": true,
			"preserve_newlines": true,
			"brace_style": "expand",
			"end_with_newline": true
		}
	}
}

// Пути к файлам
var path = {
	source: {
		html: [
			config.path.source + '/**/*.jade',
			'!' + config.path.source + '/' + config.path.partials + '/**/*.jade'
		],
		css: [
			config.path.source + '/**/*.styl',
			'!' + config.path.source + '/**/_*.styl',
			'!' + config.path.source + '/' + config.path.css + '/lib/**/*.styl'
		],
		img: config.path.source + '/' + config.path.images + '/**/*.{jpg,jpeg,png,gif,svg}',
		js: config.path.source + '/' + config.path.js + '/*.js',
		copy: config.path.assets + '/**/*'
	},

	dest: {
		html: config.path.dist,
		css: config.path.dist,
		img: config.path.dist + '/' + config.path.images,
		js: config.path.dist + '/' + config.path.js,
		copy: config.path.dist
	},

	watch: {
		html: config.path.source + '/**/*.jade',
		css: config.path.source + '/**/*.styl',
		img: config.path.source + '/' + config.path.images + '/**/*.{jpg,jpeg,png,gif,svg}',
		js: config.path.source + '/**/*.js',
		copy: config.path.assets + '/**/*'
	}
};

// Локальный сервер
gulp.task('browser-sync', function () {
	browserSync.init(plugins.browserSync.files, plugins.browserSync.options);
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.source.css)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(stylus({
			use: [
				autoprefixer(plugins.autoprefixer.options)
			]
		}))
		.pipe(cssbeautify(plugins.cssbeautify.options))
		.pipe(csscomb())
		.pipe(gulp.dest(path.dest.css))
		.pipe(browserSync.reload({stream:true}))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.dest.css))
});

// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.source.html)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(jadeInheritance(plugins.jadeInheritance.options))
		.pipe(jade(plugins.jade.options))
		.pipe(prettify(plugins.prettify.options))
		.pipe(gulp.dest(path.dest.html))
		.pipe(browserSync.reload({stream:true}))
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
	gulp.src(path.source.img)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(newer(path.dest.img))
		.pipe(imagemin(plugins.imagemin.options))
		.pipe(gulp.dest(path.dest.img));
});

// Копируем файлы
gulp.task('copy', function() {
	gulp.src(path.source.copy)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(newer(path.dest.copy))
		.pipe(gulp.dest(path.dest.copy))
		.pipe(gulpFilter(['**/*.js', '!**/*.min.js']))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.dest.css))
});

// Собираем JS
gulp.task('plugins', function() {
	gulp.src(path.source.js)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(include())
		.pipe(gulp.dest(path.dest.js))
		.pipe(uglify().on('error', gutil.log))
		.pipe(rename(plugins.rename.options))
		.pipe(gulp.dest(path.dest.js))
		.pipe(browserSync.reload({stream:true}))
});


gulp.task("build", ['stylus', 'jade', 'images', 'plugins', 'copy']);

gulp.task("default", ["build", "browser-sync"], function(){
	gulp.watch(path.watch.css, ["stylus"]);
	gulp.watch(path.watch.html, ["jade"]);
	gulp.watch(path.watch.img, ["images"]);
	gulp.watch(path.watch.js, ["plugins"]);
	gulp.watch(path.watch.copy, ["copy"]);
	gulp.watch("*.html", ['bs-reload']);
});
