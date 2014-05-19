// Инициализируем плагины
var gulp = require('gulp'),
	lr = require('tiny-lr'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	connect = require('connect'),
	nib = require('nib'),
	cssbeautify = require('gulp-cssbeautify'),
	gutil = require('gulp-util'),
	cache = require('gulp-cache'),
	server = lr();

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


// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.css.source)
		.pipe(stylus({
			use: ['nib']
		}))
		.on('error', handleError)
		.pipe(cssbeautify({
			indent: '	',
			autosemicolon: true
		}))
		.pipe(gulp.dest(path.css.destination))
		.pipe(livereload(server));
});


// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.html.source)
		.pipe(jade({
			pretty: true,
			basedir: path.html.basedir
		}))
		.on('error', handleError)
		.pipe(gulp.dest(path.html.destination))
		.pipe(livereload(server));
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
		.pipe(gulp.dest(path.assets.destination));
});

// Локальный сервер для разработки
gulp.task('http-server', function() {
	connect()
		.use(connect.static(path.assets.destination))
		.listen('3000');

	console.log('Server listening on http://localhost:3000');
});

// Запуск сервера разработки gulp watch
gulp.task("watch", function() {
	// Подключаем Livereload
	server.listen(35729, function(err) {
		if (err) return handleError(err);

		gulp.watch(path.css.watch, ['stylus']);
		gulp.watch(path.html.watch, ['jade']);
		gulp.watch(path.img.watch, ['images']);
		gulp.watch(path.assets.watch, ['copy']);

	});
});


gulp.task("build", ['stylus', 'jade', 'images', 'copy']);

gulp.task("default", ["build", "watch", "http-server"]);
