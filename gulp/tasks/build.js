'use strict';

var runSequence = require('run-sequence');

module.exports = function() {
	return function(callback) {
		return runSequence(
			'cleanup',
			[
				'build:html',
				'build:icons',
				'build:sprite',
				'modules:assets',
				'build:assets',
				'build:scripts'
			],
			'build:css',
			callback
		);
	};
};
