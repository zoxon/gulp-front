'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');


module.exports = function(options) {
	return function() {
		var spriteData = gulp.src([ '**/*.png', '!**/_*.png' ], { cwd: 'source/static/sprite' })
			.pipe(spritesmith(options.spritesmith));

		spriteData.img.pipe(buffer())
			.pipe(imagemin(options.imagemin.images))
			.pipe(gulp.dest('dest/assets/images'));

		spriteData.css.pipe(buffer())
			.pipe(gulp.dest('tmp'));

		return spriteData.img.pipe(buffer());
	}
}
