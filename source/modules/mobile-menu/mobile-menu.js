// mobile-menu
(function() {

	var $mobileMenus = $('.mobile-menu');
	var animSpeed = 400;

	if ($mobileMenus.isset()) {
		$mobileMenus.each(function() {
			var $mobileMenu = $(this);
			var $items = $mobileMenu.find('.mobile-menu__item');
			var $submenus = $mobileMenu.find('.mobile-menu__submenu');

			$items.on('click', function() {
				var $item = $(this);
				var $submenu = $item.find('.mobile-menu__submenu');

				if ($submenu.isset()) {
					$submenu.slideDown(animSpeed);
					$submenus.not($submenu).slideUp(animSpeed);
				}
			});
		});
	}

})();
