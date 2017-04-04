'use strict';

var gulp = require('gulp');
var del = require('del');


module.exports = function(options) {
	return function(callback) {
		return del(options.del, callback);
	}
}
