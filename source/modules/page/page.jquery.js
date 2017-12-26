// page
(function() {
	var $page = $('.page');
	var $cover;

	$cover = $('<div class="page__cover">').appendTo($page);

	$cover.on('click', function(event) {
		event.preventDefault();

		if ($page.hasClass('page_mobile-menu_open')) {
			$page.removeClass('page_mobile-menu_open');
		}
	});

})();
