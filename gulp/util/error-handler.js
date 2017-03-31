'use strict';

// Error handler for gulp-plumber
module.exports = function(error) {
	var colors = require('colors');
	var notifier = require('node-notifier');
	var path = require('path');
	var date = new Date();
	var cwd = process.cwd();

	var now = date.toTimeString().split(' ')[ 0 ];

	var title = error.name + ' in ' + error.plugin;

	var shortMessage = error.message.split('\n')[ 0 ];

	var message = '[' + colors.grey(now) + '] ' +
		[ title.bold.red, '', error.message, '' ].join('\n');

	// Print message to console
	console.log(message);

	notifier.notify({
		title: title,
		message: shortMessage,
		icon: path.join(cwd, 'tools/icons/error.svg')
	});


	this.emit('end');
}
