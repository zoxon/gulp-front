// spoiler
(function($, window, document, undefined) {
	'use strict';

	var $spoilers = $('[data-spoiler-target]');

	$spoilers.each(function() {
		var $spoiler = $(this);
		var targetId = $spoiler.data('spoiler-target');
		var $target = $('[data-spoiler-id="' + targetId + '"]');
		var animationSpeed = 300;

		$target.hide();

		$spoiler.click(function() {
			$target.slideToggle(animationSpeed);
		});
	});

})(jQuery, window, document);
