// Avoid `console` errors in browsers that lack a console.
import './helpers/console.polyfill';

// Precache Service Worker
import './helpers/sw-precache-registration';


// Modules
var cache = {};

function importAll(r) {
	r.keys().forEach(function(key) {
		cache[ key ] = r(key);
	});
}

importAll(require.context('../../modules/', true, /^[^\_]*\.js/));
