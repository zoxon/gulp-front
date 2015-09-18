'use strict';

// Инициализируем плагины
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	cssbeautify = require('gulp-cssbeautify'),
	gutil = require('gulp-util'),
	changed = require('gulp-changed'),
	include = require('gulp-include'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify'),
	imageminPngquant = require('imagemin-pngquant'),
	jadeInheritance = require('gulp-jade-inheritance'),
	csscomb = require('gulp-csscomb');

// Функция обработки ошибок
var handleError = function(err) {
	gutil.log(err);
	gutil.beep();
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
		files: [
			'*.html',
			'css/*.css',
			'**/*.{png,jpg,svg}',
			'js/*.js',
			'fonts/*.{eot,woff,woff2,ttf}'
		],
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


// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.source.css)
		.pipe(stylus(plugins.stylus.options))
		.pipe(autoprefixer(plugins.autoprefixer.options))
		.pipe(cssbeautify(plugins.cssbeautify.options))
		.pipe(csscomb())
		.on('error', handleError)
		.pipe(gulp.dest(path.dest.css))
		.pipe(reload({stream:true}));
});

// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.source.html)
		.pipe(jadeInheritance(plugins.jadeInheritance.options))
		.pipe(jade(plugins.jade.options))
		.on('error', handleError)
		.pipe(gulp.dest(path.dest.html))
		.pipe(reload({stream:true}));
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
	gulp.src(path.source.img)
		.pipe(changed(path.dest.img))
		.pipe(imagemin(plugins.imagemin.options))
		.on('error', handleError)
		.pipe(gulp.dest(path.dest.img));
});

// Копируем файлы
gulp.task('copy', function() {
	gulp.src(path.source.copy)
		.on('error', handleError)
		.pipe(gulp.dest(path.dest.copy));
});

// Собираем JS
gulp.task('plugins', function() {
	gulp.src(path.source.js)
		.pipe(include())
		.pipe(gulp.dest(path.dest.js))
		.pipe(uglify().on('error', gutil.log))
		.pipe(rename(plugins.rename.options))
		.on('error', handleError)
		.pipe(gulp.dest(path.dest.js))
		.pipe(reload({stream:true}));
});


gulp.task("build", ['stylus', 'jade', 'images', 'plugins', 'copy']);

gulp.task("default", ["build", "browser-sync"], function(){
	gulp.watch(path.watch.css, ["stylus"]);
	gulp.watch(path.watch.html, ["jade"]);
	gulp.watch(path.watch.img, ["images"]);
	gulp.watch(path.watch.js, ["plugins"]);
	gulp.watch(path.watch.copy, ["copy"]);
});
