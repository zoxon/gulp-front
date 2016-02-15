var $scrollTop = $('.scroll-top');

$scrollTop.click(function(event) {
	event.preventDefault();


	$('html, body').stop().animate({
		'scrollTop': 0
	}, 900, 'swing');
});
