'use strict';

var gulp = require('gulp');
var path = require('path');
var cwd = process.cwd();

function loadTask(taskName, taskPath) {
	var taskPath = path.resolve(cwd, taskPath);

	gulp.task(taskName, function(callback) {
		var task = require(taskPath).call(this);

		return task(callback);
	});
}

module.exports = loadTask;
