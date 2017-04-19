'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
// var include = require('gulp-include');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('../../webpack.config.js');
var gulplog = require('gulplog');
var config = require('../config.js');
var options = {
	plumber: config.plumber()
};

module.exports = function() {
	return function(callback) {
		var firstBuildReady = false;

		function done(err, stats) {
			firstBuildReady = true;

			if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
				return;  // emit('error', err) in webpack-stream
			}

			// https://webpack.js.org/api/node/#stats-object
			gulplog[ stats.hasErrors() ? 'error' : 'info' ](stats.toString({
				chunks: false,  // Makes the build much quieter
				colors: true    // Shows colors in the console
			}));
		}

		return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts' })
			.pipe(plumber(options.plumber))
			.pipe(webpackStream(webpackConfig, webpack, done))
			.pipe(gulp.dest('dest/assets/javascripts'))
			.on('data', function() {
				if (firstBuildReady) {
					callback();
				}
			});
	};
};
