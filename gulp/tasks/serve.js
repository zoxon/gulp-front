'use strict';

var browserSync = require('browser-sync').create('default');

module.exports = function(options) {
	return function() {
		return browserSync.init(options.browserSync);
	}
}

