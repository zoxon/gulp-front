// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Собираем все нужные плагины в нужном порядке
// Подробнее https://www.npmjs.com/package/gulp-include

//////////////////////////////////////////////////////////////////////////////
// Important plugins
//////////////////////////////////////////////////////////////////////////////

// Enable html5 tags support in old browsers
//= require plugins/html5shiv/html5shiv.js

// Enable @media support in old browsers
//= require plugins/respond/respond.src.js

// Browser feature detection library for HTML5/CSS3
//= require plugins/modernizr/modernizr-2.8.3.min.js


//////////////////////////////////////////////////////////////////////////////
// Optionals plugins
//////////////////////////////////////////////////////////////////////////////

// Sliders
// ---------------------------------------------------------------------------
// require plugins/slick/slick.js
// require plugins/bjqs/bjqs-1.3.js


// Modlal windows and lightbox gallery
// ---------------------------------------------------------------------------
// require plugins/colorbox/jquery.colorbox.js
// require plugins/colorbox/i18n/jquery.colorbox-ru.js


// Share buttons
// ---------------------------------------------------------------------------
// require plugins/social-likes/social-likes.js


// Gallery
// ---------------------------------------------------------------------------
// require plugins/fotorama/fotorama.js


// Drag'n drop file uploader
// ---------------------------------------------------------------------------
// require plugins/dropzone/dropzone.js


// JQuery UI
// ---------------------------------------------------------------------------
// UI Core
// require plugins/jquery-ui/core.js
// require plugins/jquery-ui/widget.js
// require plugins/jquery-ui/mouse.js
// require plugins/jquery-ui/position.js

// Interactions
// require plugins/jquery-ui/draggable.js
// require plugins/jquery-ui/droppable.js
// require plugins/jquery-ui/resizable.js
// require plugins/jquery-ui/selectable.js
// require plugins/jquery-ui/sortable.js

// Widgets
// require plugins/jquery-ui/accordion.js
// require plugins/jquery-ui/autocomplete.js
// require plugins/jquery-ui/button.js
// require plugins/jquery-ui/datepicker.js
// require plugins/jquery-ui/dialog.js
// require plugins/jquery-ui/menu.js
// require plugins/jquery-ui/progressbar.js
// require plugins/jquery-ui/selectmenu.js
// require plugins/jquery-ui/slider.js
// require plugins/jquery-ui/spinner.js
// require plugins/jquery-ui/tabs.js
// require plugins/jquery-ui/tooltip.js

// Effects
// require plugins/jquery-ui/effect.js
// require plugins/jquery-ui/effect-blind.js
// require plugins/jquery-ui/effect-bounce.js
// require plugins/jquery-ui/effect-clip.js
// require plugins/jquery-ui/effect-drop.js
// require plugins/jquery-ui/effect-explode.js
// require plugins/jquery-ui/effect-fade.js
// require plugins/jquery-ui/effect-fold.js
// require plugins/jquery-ui/effect-highlight.js
// require plugins/jquery-ui/effect-puff.js
// require plugins/jquery-ui/effect-pulsate.js
// require plugins/jquery-ui/effect-scale.js
// require plugins/jquery-ui/effect-shake.js
// require plugins/jquery-ui/effect-size.js
// require plugins/jquery-ui/effect-slide.js
// require plugins/jquery-ui/effect-transfer.js

// Language
// require plugins/jquery-ui/i18n/datepicker-ru.js
// require plugins/jquery-ui/i18n/datepicker-en-GB.js
// require plugins/jquery-ui/i18n/datepicker-ky.js


// Browser detection library
// ---------------------------------------------------------------------------
// require plugins/bowser/bowser.js


// Positioned element on the page, and lock within the user's viewport when scrolling
// ---------------------------------------------------------------------------
// require plugins/lockfixed/jquery.lockfixed.js


// Cross-browser mouse wheel support with delta normalization
// ---------------------------------------------------------------------------
// require plugins/mousewheel/jquery.mousewheel.js


// Scrollbar plugin
// ---------------------------------------------------------------------------
// require plugins/perfect-scrollbar/perfect-scrollbar.js

// Forms
// ---------------------------------------------------------------------------
//= require plugins/formstyler/jquery.formstyler.js


// Tabs
// ---------------------------------------------------------------------------
// require plugins/ion-tabs/ion.tabs.js


// Ion Slider
// ---------------------------------------------------------------------------
// require plugins/ion-rangeSlider/ion.rangeSlider.js

// Transit
// ---------------------------------------------------------------------------
//= require plugins/transit/jquery.transit.js

// Basic table
// ---------------------------------------------------------------------------
//= require plugins/basictable/jquery.basictable.js


// Remodal
// ---------------------------------------------------------------------------
//= require plugins/remodal/remodal.js


// My plugins
// ---------------------------------------------------------------------------
// require plugins/jquery.drop-down.js
// require plugins/jquery.equal-heights.js
// require plugins/jquery.highlight.js
// require plugins/jquery.link-radio.js
// require plugins/jquery.raiting.js
// require plugins/jquery.spinner.js
// require plugins/jquery.tabs.js

