// alert
;(function ( $, window, document, undefined ) {
	$('.alert__close').on('click', function() {
		$(this).closest('.alert').fadeOut();
	});
})( jQuery, window, document );
