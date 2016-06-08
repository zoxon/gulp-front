// Alert
(function() {
	$('.alert__close').on('click', function() {
		$(this).closest('.alert').fadeOut();
	});
})();
