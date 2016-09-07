// Input type="file"
;(function ( $, window, document, undefined ) {
	"use strict";

	var $files = $('.file');

	$files.each(function(index, el) {
		var $file = $(this);
		var $label = $file.find('.file__button');
		var $fileControl = $file.find('.file__control');
		var labelText = $label.text();

		$file.on('change', '.file__control', function(event) {
			// event.preventDefault();

			var fileName = '';

			if(this.files && this.files.length > 1) {
				fileName = ($(this).data('multiple-caption') || '').replace('{count}', this.files.length);
			}
			else {
				fileName = event.target.value.split( '\\' ).pop();
			}

			if( fileName ) {
				$label.text(fileName);
			}
			else {
				$label.text(labelText);
			}
		});
	});

})( jQuery, window, document );
