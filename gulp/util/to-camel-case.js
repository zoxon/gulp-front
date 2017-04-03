'use strict';

function toCamelCase(str) {
	return str.replace(/[_-][a-z]/ig, function (s) {
		return s.substring(1).toUpperCase();
	});
}

module.exports = toCamelCase;
