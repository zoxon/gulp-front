// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[ length ];

		// Only stub undefined methods.
		if (!console[ method ]) {
			console[ method ] = noop;
		}
	}
}());


// Собираем все нужные плагины в нужном порядке
// Подробнее https://www.npmjs.com/package/gulp-include

//////////////////////////////////////////////////////////////////////////////
// Important plugins
//////////////////////////////////////////////////////////////////////////////

// JQuery
// Browser feature detection library for HTML5/CSS3
//= require jquery/dist/jquery.js

// Modernizr
// Browser feature detection library for HTML5/CSS3
//= require modernizr/modernizr-custom-3.2.0.js


// FastclickJS
// Remove delay between a physical tap and the firing of a click event on mobile browsers.
//= require fastclick/lib/fastclick.js


// Placeholders polyfill
//= require placeholders.js/lib/utils.js
//= require placeholders.js/lib/main.js
//= require placeholders.js/lib/adapters/placeholders.jquery.js


// SVG4Everybody
//= require svg4everybody/dist/svg4everybody.js

// Helpers
//= require helpers/jquery.isset.js


//////////////////////////////////////////////////////////////////////////////
// Optionals plugins
//////////////////////////////////////////////////////////////////////////////

// Basic table
// Responsive tables
// ---------------------------------------------------------------------------
//= require basictable/jquery.basictable.js


// Remodal
// Css modal windows
// ---------------------------------------------------------------------------
//= require remodal/dist/remodal.js


// jquery-throttle-debounce
//= require jquery-throttle-debounce/jquery.ba-throttle-debounce.js
