// Header
(function() {

	function headerScrollHandler() {
		var top = $(window).scrollTop();
		var fixed = false;

		if (top > 0) {
			fixed = true;
		}

		$('.header').toggleClass('header_fixed', fixed);
	}

	$(window).on('scroll', $.debounce( 150, headerScrollHandler ))
		.trigger('scroll');

})();
