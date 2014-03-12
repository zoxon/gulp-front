console.log('███████████████████████████████████████████████████████████████████████████████');
console.log('█████████████▀▀▀▀▀███▀▀▀▀██▀▀▀▀█████▀▀▀▀▀▀█████▀▀▀▀▀▀▀▀▀▀███▀▀▀▀▀▀▀▀▀▀█████████');
console.log('█████████████     ███    ██    ██████    ██████          ███          █████████');
console.log('█████████████▌   ▐███    ██    ██████    ██████    ██    ███    ███▄▄▄█████████');
console.log('█████████████▌   ▐███    ██    ██████    ██████    █████████          █████████');
console.log('████████    █▌   ▐███    ██    ██████    ██████    ██    ███    ███▀▀▀█████████');
console.log('████████          ████        ███████    ██████          ███          █████████');
console.log('████████▄▄▄▄▄▄▄▄▄▄█████▄▄▄▄▄▄███████▄▄▄▄▄▄█████▄▄▄▄▄▄▄▄▄▄███▄▄▄▄▄▄▄▄▄▄█████████');
console.log('███████████████████████████████████████████████████████████████████████████████');


// Инициализируем плагины
var gulp = require('gulp'),
	lr = require('tiny-lr'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	//uglify = require('gulp-uglify'),
	//concat = require('gulp-concat'),
	connect = require('connect'),
	nib = require('nib'),
	cssbeautify = require('gulp-cssbeautify'),
	prettify = require('gulp-prettify'),
	zip = require('gulp-zip'),
	server = lr();


// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(['./source/css/*.styl', '!./source/css/lib/**/*.styl', '!./source/**/_*.styl'])
		.pipe(stylus({
			use: ['nib']
		}))
		.on('error', console.log)
		.pipe(cssbeautify({
			indent: '	',
			autosemicolon: true
		}))
		.pipe(gulp.dest('./public/css/'))
		.pipe(livereload(server));
});


// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(['./source/**/*.jade', '!./source/partials/*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.on('error', console.log)

	.pipe(prettify({
		indent_char: '	',
		indent_size: 1,
		indent_with_tabs: true
	}))
		.pipe(gulp.dest('./public/'))
		.pipe(livereload(server));
});


// Копируем и минимизируем изображения
gulp.task('images', function() {
	gulp.src('./source/img/**/*.{jpg,jpeg,png,gif}')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/img'))
});

// Копируем файлы
gulp.task('copy', function() {
	gulp.src('./assets/**/*')
		.pipe(gulp.dest('./public'));
});

// Локальный сервер для разработки
gulp.task('http-server', function() {
	connect()
		.use(require('connect-livereload')())
		.use(connect.static('./public'))
		.listen('3000');

	console.log('Server listening on http://localhost:3000');
});


// Запуск сервера разработки gulp watch
gulp.task('default', function() {
	// Предварительная сборка проекта
	gulp.run('stylus');
	gulp.run('jade');
	gulp.run('images');
	gulp.run('copy');
	// gulp.run('js');

	// Подключаем Livereload
	server.listen(35729, function(err) {
		if (err) return console.log(err);

		gulp.watch('source/**/*.styl', function() {
			gulp.run('stylus');
		});
		gulp.watch('source/**/*.jade', function() {
			gulp.run('jade');
		});
		gulp.watch('source/img/**/*', function() {
			gulp.run('images');
		});
		gulp.watch('assets/**/*', function() {
			gulp.run('copy');
		});
	});
	gulp.run('http-server');

});

// gulp.task('build', function() {
// 	// css
// 	gulp.src(['./source/css/*.styl', '!./source/css/lib/**/*.styl', '!./source/**/_*.styl'])
// 		.pipe(stylus({
// 			use: ['nib']
// 		}))
// 		.pipe(cssbeautify({
// 			indent: '	',
// 			autosemicolon: true
// 		}))
// 		.pipe(gulp.dest('./build/css/')) // записываем css

// 	// jade
// 	gulp.src(['./source/**/*.jade', '!./source/partials/*.jade'])
// 		.pipe(jade({
// 			pretty: true
// 		}))
// 		.on('error', console.log)

// 	.pipe(prettify({
// 		indent_char: '	',
// 		indent_size: 1,
// 		indent_with_tabs: true
// 	}))
// 		.pipe(gulp.dest('./build/'));

// 	// image
// 	gulp.src('./source/img/**/*.{jpg,jpeg,png,gif}')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('./build/img'));

// 	//Файлы
// 	gulp.src('./assets/**/*')
// 		.pipe(gulp.dest('./build'));

// 	//Жмем в архив
// 	gulp.src('build/**/*')
//         .pipe(zip('build.zip'))
//         .pipe(gulp.dest('.'));

// });