// mobile-menu-trigger
(function() {

	var $trigger = $('.mobile-menu-trigger');
	var $page = $('.page');

	$trigger.on('click', function(event) {
		event.preventDefault();
		$page.toggleClass('page_mobile-menu_open');
	});

})();
