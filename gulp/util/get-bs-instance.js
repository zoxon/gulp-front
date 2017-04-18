'use strict';

var bs = require('browser-sync');

function getBrowserSyncInstance() {
	if (bs.has('default')) {
		return bs.get('default');
	}
	else {
		return bs.create('default');
	}
}


module.exports = getBrowserSyncInstance();
