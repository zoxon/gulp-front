'use strict';

// Read json and return object
function getJsonData(file) {
	var fs = require('fs');
	var path = require('path');
	var cwd = process.cwd();

	return JSON.parse(
		fs.readFileSync(
			path.join(cwd, file),
			'utf8'
		)
	);
}

module.exports = getJsonData;
