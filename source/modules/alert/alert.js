// alert
(function() {

	var $alerts = $('.alert');

	if ($alerts.isset()) {
		$alerts.each(function() {
			var $alert = $(this);
			var $close = $alert.find('.alert__close');

			$close.on('click', function(event) {
				event.preventDefault();
				$alert.fadeOut();
			});
		});
	}

})();
