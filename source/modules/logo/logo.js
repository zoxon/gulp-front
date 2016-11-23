// Logo
(function($, window, document, undefined) {
	$('.logo').click(function(event) {
		event.preventDefault();

		$('html, body').stop().animate({
			'scrollTop': 0
		}, 900, 'swing');
	});
})(jQuery, window, document);
