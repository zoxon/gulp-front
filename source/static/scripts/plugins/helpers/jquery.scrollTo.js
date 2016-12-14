// Scroll to position
(function($, window, document, undefined) {

	$.scrollTo = function(pos, speed, cb) {
		var $that = $(this);

		$('html, body').stop().animate({
			'scrollTop': pos
		}, speed, cb);

	};


})(jQuery, window, document);
