// Input type="file"
;(function ( $, window, document, undefined ) {
	"use strict";

	var $spoilers = $('[data-spoiler-target]');

	$spoilers.each(function(index, el) {
		var $spoiler = $(this);
		var targetId = $spoiler.data('spoiler-target');
		var $target = $('[data-spoiler-id="' + targetId + '"]');
		var animationSpeed = 300;

		$target.hide();

		$spoiler.click(function(event) {
			$target.slideToggle(animationSpeed);
		});
	});

})( jQuery, window, document );
