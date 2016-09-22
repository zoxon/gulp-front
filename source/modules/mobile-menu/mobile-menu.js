// Mobile menu
;(function ( $, window, document, undefined ) {
	var mmenu = {
		trigger: $('.mobile-menu-trigger'),
		panel: $('.page__mobile-menu'),
		pageContent: $('.page__content'),
		cover: true,
		menuPosition: 'right',

		show: function(){
			$('.page').addClass('page_mmenu-open', function(){
				mmenu.panel.show();
			});
		},

		hide: function(){
			$('.page').removeClass('page_mmenu-open', function(){
				mmenu.panel.hide();
			});
		}
	};

	if (mmenu.cover) {
		mmenu.pageContent.append('<div class="page__cover">');
	}

	mmenu.trigger.click(function(event) {
		event.preventDefault();
		mmenu.show();
	});

	$('.page__cover').on('click', function(event) {
		event.preventDefault();

		if ($('.page').hasClass('page_mmenu-open')) {
			event.preventDefault();
			mmenu.hide();
		}
	});

	$('.mobile-menu__item').each(function() {
		var $item = $(this);
		var $link = $item.find('.mobile-menu__link');
		var $sumbmenu = $item.find('.mobile-menu__submenu');
		var speed = 400;
		if ($sumbmenu.length > 0) {
			$link.click(function(event) {
				event.preventDefault();
				var $item = $(this).parent();
				if ($item.hasClass('mobile-menu__item_open')) {
					$sumbmenu.slideUp(speed);
					$item.removeClass('mobile-menu__item_open');
				}
				else {
					$('.mobile-menu__submenu').slideUp(speed);
					$sumbmenu.slideToggle(speed);
					$('.mobile-menu__item').removeClass('mobile-menu__item_open');
					$item.addClass('mobile-menu__item_open');
				}
			});
		}

	});

})( jQuery, window, document );
