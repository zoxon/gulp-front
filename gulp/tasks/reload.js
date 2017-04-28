'use strict';

var browserSync = require('../util/get-bs-instance.js');

module.exports = function() {
	return function(calback) {
		browserSync.reload();
		calback();
	};
};

