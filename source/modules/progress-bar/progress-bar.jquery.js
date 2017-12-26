// progress-bar
(function() {

	var $progressBars = $('.progress-bar');

	if ($progressBars.isset()) {
		$progressBars.each(function() {
			var $progress = $(this);
			var $progressBar = $progress.children('.progress-bar__bar');
			var value = $progress.data('progres-value');

			$progressBar.css({ 'width': value * 100 + '%' });
		});
	}


})();
