'use strict';

function correctNumber(number) {
	return number < 10 ? '0' + number : number;
}

module.exports = correctNumber;
