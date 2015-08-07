Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'js/placeholders.min.js'
	},
	{
		test: Modernizr.touch,
		yep: ['js/fastclick.min.js'],
		nope: [
			'js/jquery.formstyler.min.js',
			'css/formstyler.css'
		],
		complete: function(){
			if (Modernizr.touch) {
				FastClick.attach(document.body);
			}
			else {
				// Form styler
				$('select, input').styler();

				// Colorbox
				// $('a.js-cbox-modal').colorbox({
				// 	title: " ",
				// 	previous: false,
				// 	next: false,
				// 	arrowKey: false,
				// 	rel: false,
				// 	overlayClose: true,
				// 	opacity: 0.8,
				// 	maxWidth: '100%',
				// 	maxHeight: '100%',
				// 	onComplete: function() {
				// 		$('input, select').styler();
				// 		$.colorbox.resize();
				// 	}
				// });
			}
		}
	}
]);


$(document).ready(function() {

});
