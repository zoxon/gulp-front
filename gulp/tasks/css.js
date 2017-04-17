'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var combineMq = require('gulp-combine-mq');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var config = require('../config.js');
var options = {
	plumber: config.plumber(),
	stylus: config.stylus(),
	postcss: config.postcss()
};


module.exports = function() {
	return function() {
		return gulp.src([ '*.styl', '!_*.styl' ], { cwd: 'source/static/styles' })
			.pipe(plumber(options.plumber))
			.pipe(stylus(options.stylus))
			.pipe(combineMq({ beautify: true }))
			.pipe(postcss(options.postcss))
			.pipe(gulp.dest('dest/assets/stylesheets'))
			.pipe(browserSync.reload({
				stream: true,
				match: '**/*.css'
			}));
	};
};

