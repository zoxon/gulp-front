// Isset
(function($, window, document, undefined) {
	'use strict';

	$.fn.isset = function() {
		var $this = $(this);
		return typeof $this !== 'undefined' && $this.length > 0;
	};

})(jQuery, window, document);
