'use strict';

// Modules
var cache = {};

function importAll(r) {
	r.keys().forEach(function(key) {
		cache[ key ] = r(key);
	});
}

importAll(require.context('../../modules/', true, /^[^\_]*\.js/));
