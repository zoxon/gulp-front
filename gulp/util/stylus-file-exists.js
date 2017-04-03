'use strict';

// https://github.com/stylus/stylus/issues/1872#issuecomment-86553717
function stylusFileExists() {
	var stylus = require('gulp-stylus');

	return function(style) {
		style.define('file-exists', function(path) {
			return !!stylus.stylus.utils.lookup(path.string, this.paths);
		});
	};
}

module.exports = stylusFileExists;
