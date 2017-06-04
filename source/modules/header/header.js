// Header
(function() {
	var debounce = require('throttle-debounce').debounce;

	function headerScrollHandler() {
		var top = $(window).scrollTop();
		var fixed = false;

		if (top > 0) {
			fixed = true;
		}

		$('.header').toggleClass('header_fixed', fixed);
	}

	$(window).on('scroll', debounce( 66, headerScrollHandler ))
		.trigger('scroll');

})();
