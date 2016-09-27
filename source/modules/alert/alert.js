// alert
;(function ( $, window, document, undefined ) {
	'use strict';

	$('.alert__close').on('click', function() {
		$(this).closest('.alert').fadeOut();
	});

})( jQuery, window, document );
