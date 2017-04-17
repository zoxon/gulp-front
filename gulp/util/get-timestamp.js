'use strict';

var correctNumber = require('./correct-number.js');

// Return timestamp
function getTimestamp() {
	var now = new Date();
	var year = now.getFullYear();
	var month = correctNumber(now.getMonth() + 1);
	var day = correctNumber(now.getDate());
	var hours = correctNumber(now.getHours());
	var minutes = correctNumber(now.getMinutes());
	return year + '-' + month + '-' + day + '-' + hours + minutes;
}


module.exports = getTimestamp;
