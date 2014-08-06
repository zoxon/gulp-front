// Инициализируем плагины
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	imagemin = require('gulp-imagemin'),
	webserver = require('gulp-webserver'),
	cssbeautify = require('gulp-cssbeautify'),
	gutil = require('gulp-util'),
	cache = require('gulp-cache'),

// Функция обработки ошибок
handleError = function(err) {
	gutil.log(err);
	gutil.beep();
};

// Пути к файлам
path = {
	html: {
		source: ['./source/**/*.jade', '!./source/partials/*.jade', '!./source/blocks/**/*.jade'],
		watch: 'source/**/*.jade',
		destination: './public/',
		basedir: './source'
	},
	css: {
		source: ['./source/css/*.styl', '!./source/css/lib/**/*.styl', '!./source/**/_*.styl'],
		watch: 'source/**/*.styl',
		destination: './public/css/'
	},
	assets: {
		source: './assets/**/*',
		watch: 'assets/**/*',
		destination: './public'
	},
	img: {
		source: './source/img/**/*.{jpg,jpeg,png,gif}',
		watch: 'source/img/**/*',
		destination: './public/img'
	}
};


// Локальный сервер
gulp.task('webserver', function() {
	gulp.src('public')
	.pipe(webserver({
		host: 'localhost',
		port: 3000,
		livereload: true
	}));
});

// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.css.source)
		.pipe(stylus({
			use: [nib()]
		}))
		.on('error', handleError)
		.pipe(cssbeautify({
			indent: '	',
			autosemicolon: true
		}))
		.pipe(gulp.dest(path.css.destination))
});

// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.html.source)
		.pipe(jade({
			pretty: true,
			basedir: path.html.basedir,
			data: gulp.src(['users.json'])
		}))
		.on('error', handleError)
		.pipe(gulp.dest(path.html.destination))
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
	gulp.src(path.img.source)
		.on('error', handleError)
		.pipe(cache(imagemin()))
		.pipe(gulp.dest(path.img.destination))
});

// Копируем файлы
gulp.task('copy', function() {
	gulp.src(path.assets.source)
		.on('error', handleError)
		.pipe(gulp.dest(path.assets.destination))
});

// Запуск сервера разработки gulp watch
gulp.task("watch", function() {
	gulp.watch(path.css.watch, ['stylus']);
	gulp.watch(path.html.watch, ['jade']);
	gulp.watch(path.img.watch, ['images']);
	gulp.watch(path.assets.watch, ['copy']);
});


gulp.task("build", ['stylus', 'jade', 'images', 'copy']);

gulp.task("default", ["build", "watch", "webserver"]);
