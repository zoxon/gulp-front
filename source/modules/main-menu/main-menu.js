// main-menu
(function() {

	var $mainMenus = $('.main-menu');

	if ($mainMenus.isset()) {
		$mainMenus.each(function() {
			var $menu = $(this);
			var $links = $menu.find('a[href^="#"]');
			var offset = parseInt($('.header__top').outerHeight());
			var animSpeed = 700;

			// Scroll on click
			$links.on('click', function(event) {
				event.preventDefault();
				var $link = $(this);

				var hash = $link.attr('href');
				var $target = $(hash);

				if ($target.isset()) {
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top - offset - 20
					}, animSpeed, 'swing', function() {
						window.location.hash = hash;
					});
				}

			});

		});
	}

})();
