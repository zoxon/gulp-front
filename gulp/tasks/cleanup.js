'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var del = require('del');


gulp.task('cleanup', function(cb) {
	return del(options.del, cb);
});
