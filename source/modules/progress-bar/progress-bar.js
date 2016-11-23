// progress-bar
(function($, window, document, undefined) {
	'use strict';

	var $progressBars = $('.progress-bar');

	$progressBars.each(function() {
		var $progress = $(this);
		var $progressBar = $progress.children('.progress-bar__bar');
		var value = $progress.data('progres-value');

		$progressBar.css({ 'width': value * 100 + '%' });
	});

})(jQuery, window, document);
