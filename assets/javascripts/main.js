$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('select, input').styler();

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	$('.alert__close').on('click', function() {
		$(this).closest('.alert').fadeOut();
	});
	
	
	// Accordion
	$('.accordion').each(function(index, el) {
		var $that = $(this);
		var $items = $(this).find('.accordion__item');
		var $headers = $(this).find('.accordion__header');
		var $contents = $(this).find('.accordion__content');
		var speed = 300;
	
		$items.each(function(index, el) {
			var findActive = false;
	
			if (!findActive) {
				if ($(this).hasClass('accordion__item_active')) {
					$(this).children('.accordion__content').show();
					return false;
				}
			}
			else {
				$(this).removeClass('accordion__item_active');
			}
		});
	
		$headers.click(function(event) {
			event.preventDefault();
	
			var $item = $(this).parent();
	
			if (!$item.hasClass('accordion__item_active')) {
				$items.removeClass('accordion__item_active');
				$item.addClass('accordion__item_active');
				$contents.slideUp(speed);
				$item.children('.accordion__content').slideDown(speed);
			}
			else {
				$item.children('.accordion__content').slideUp(speed);
				$item.removeClass('accordion__item_active');
			}
		});
	});
	
	
	$('.browsehappy').click(function() {
		$(this).slideUp();
	});
	
	
	var $header    = $('.header')
		$headerTop = $header.find('.header__top'),
		$window    = $(window),
		marginTop  = 0,
		offset     = $headerTop.offset().top,
		classAdded = false;
	
	$window.scroll(function() {
		if ($window.scrollTop() > offset) {
			if (classAdded === false) {
				$header.addClass('header_fixed');
			}
			classAdded = true;
		}
		else {
			$header.removeClass('header_fixed');
			classAdded = false;
		}
	});
	
	
	$('.js-link-sroll a[href^="#"]').on('click',function (event) {
		event.preventDefault();
		var $heder = $('.header__top');
		var target = this.hash;
		var $target = $(target);
	
		if ($(this).parent().hasClass('main-menu-submenu__item')) {
			$('.main-menu-submenu__item').removeClass('main-menu-submenu__item_active');
			$(this).parent().addClass('main-menu-submenu__item_active');
		}
	
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - $heder.outerHeight()
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
	
	$('.logo').click(function(event) {
		event.preventDefault();
	
		$('html, body').stop().animate({
			'scrollTop': 0
		}, 900, 'swing');
	});
	
	
	var mmenu = {
		trigger: $('.mobile-menu-trigger'),
		panel: $('.page__mobile-menu'),
		pageContent: $('.page__content'),
		cover: true,
		menuPosition: 'right',
	
		show: function(){
			mmenu.panel.show();
			var menuWidth = mmenu.panel.width();
	
			if (mmenu.menuPosition === 'right') {
				var menuWidth = '-' + menuWidth;
			}
	
			// mmenu.pageContent.transition({
			// 	x: menuWidth + 'px',
			// 	complete: function(){
			// 		$('.page').addClass('page_mmenu-open');
			// 		$('html, body').css({
			// 			"overflow": "hidden",
			// 			"height": "auto"
			// 		});
			// 	}
			// });
			$('.page').addClass('page_mmenu-open', function(){
				$('.page').addClass('page_mmenu-open');
				$('html, body').css({
					"overflow": "hidden",
					"height": "auto"
				});
			});
		},
	
		hide: function(){
			$('.page').removeClass('page_mmenu-open', function(){
					mmenu.panel.hide();
					$('html, body').removeAttr('style');
					$(this).removeAttr('style');
				});
			// mmenu.pageContent.transition({
			// 	x: 0,
			// 	complete: function(){
			// 		mmenu.panel.hide();
			// 		$('html, body').removeAttr('style');
			// 		$(this).removeAttr('style');
			// 	}
			// });
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
	
	
	// Remodal init
	$('[data-remodal-id]').remodal();
	
	
	// Dropdown
	$('.pseudo-dropdown').each(function(index, el) {
		var $that = $(this);
		var $trigger = $(this).find('.pseudo-dropdown__trigger');
		var $list = $(this).find('.pseudo-dropdown-list__item');
		var $active = $(this).find('.pseudo-dropdown-list__item_active');
		var $dropdown = $(this).find('.pseudo-dropdown__list');
	
		var $triggerText = '';
	
		// Set initial state
		if ($active.length > 0) {
			$triggerText = $active.text();
		}
		else {
			$triggerText = $list.first().text()
		}
	
		$trigger.text($triggerText);
	
		// Show dorpdown
		if (!$that.hasClass('pseudo-dropdown_dropdown_open')) {
			$trigger.click(function(event) {
				event.preventDefault();
				// Close all open dropdowns
				$('.pseudo-dropdown').removeClass('pseudo-dropdown_dropdown_open');
				$that.toggleClass('pseudo-dropdown_dropdown_open');
			});
		}
	
		// Dropdown item click
		$list.click(function(event) {
			event.preventDefault();
	
			var $triggerText = '';
	
			if ($(this).is('li') && $(this).text() != '') {
				$triggerText = $(this).text();
			}
			else {
				$triggerText = $(this).children('a').text();
			}
			$trigger.text($triggerText);
	
			$list.removeClass('pseudo-dropdown-list__item_active');
			$(this).addClass('pseudo-dropdown-list__item_active');
	
			$that.toggleClass('pseudo-dropdown_dropdown_open');
	
			if ($(this).attr('data-value').length > 0) {
				alert('Selected: "' + $(this).attr('data-value') + '" (' + $triggerText + ')');
			}
		});
	
		// Outer click
		$(document).on('click', function(event) {
			var closeClassName = 'pseudo-dropdown';
			var $hideObject = $('.pseudo-dropdown__list');
	
			if (!$(event.target).closest('.'+closeClassName).length) {
				if ($hideObject.is(":visible")) {
					$('.pseudo-dropdown').removeClass('pseudo-dropdown_dropdown_open');
				}
			}
		});
	});
	
	
	var $scrollTop = $('.scroll-top');
	
	$scrollTop.click(function(event) {
		event.preventDefault();
	
	
		$('html, body').stop().animate({
			'scrollTop': 0
		}, 900, 'swing');
	});
	

});
