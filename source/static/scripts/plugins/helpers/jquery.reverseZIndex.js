// Reverse z-index
(function( $, window, document, undefined) {
	'use strict';

	$.fn.reverseZIndex = function() {
		var count = $(this).length;

		return this.each(function() {
			$(this).css({ 'z-index': count-- });
		});

	};

})(jQuery, window, document);
