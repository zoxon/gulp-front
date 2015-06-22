$(document).ready(function() {
	// Form Styler
	$('select, input').styler();

	//Placeholder
	$('.js-input-placeholder').placeholder();

	//Colorbox
	$('a.js-cbox-modal').colorbox({
		title: " ",
		previous: false,
		next: false,
		arrowKey: false,
		rel: false,
		overlayClose: true,
		opacity: 0.8,
		onComplete: function() {
			$('input, select').styler();
			$.colorbox.resize();
		}
	});

});
