'use strict';

var gulp = require('gulp');
var del = require('del');
var options = require('../config.js').del();


module.exports = function() {
	return function(callback) {
		return del(options, callback);
	};
};
