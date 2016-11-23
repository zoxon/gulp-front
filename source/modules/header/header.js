// Header
(function($, window, document, undefined) {
	'use strict';

	var $header    = $('.header');
	var $window    = $(window);
	var classAdded = false;
	function header() {
		if ($window.scrollTop() > 0) {
			if (classAdded === false) {
				$header.addClass('header_fixed');
			}
			classAdded = true;
		}
		else {
			$header.removeClass('header_fixed');
			classAdded = false;
		}
	}

	header();

	$window.scroll(header);


	$('.js-link-sroll a[href^="#"]').on('click', function(event) {
		event.preventDefault();
		var $heder = $('.header__top');
		var target = this.hash;
		var $target = $(target);

		if ($(this).parent().hasClass('main-menu-submenu__item')) {
			$('.main-menu-submenu__item').removeClass('main-menu-submenu__item_active');
			$(this).parent().addClass('main-menu-submenu__item_active');
		}

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - $heder.outerHeight() - 20
		}, 900, 'swing', function() {
			window.location.hash = target;
		});
	});

})(jQuery, window, document);
