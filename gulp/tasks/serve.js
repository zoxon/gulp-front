'use strict';

var browserSync = require('../util/get-bs-instance.js');

var config = require('../config.js');
var options = {
	browserSync: config.browserSync()
};

module.exports = function() {
	return function() {
		return browserSync.init(options.browserSync);
	};
};

