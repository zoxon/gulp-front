'use strict';

var browserSync = require('browser-sync').create('default');

var config = require('../config.js');
var options = {
	browserSync: config.browserSync()
};

module.exports = function() {
	return function() {
		return browserSync.init(options.browserSync);
	};
};

