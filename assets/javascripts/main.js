'use strict';

$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('.table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	// Accordion
	(function() {
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
	})();
	
	
	// Alert
	(function() {
		$('.alert__close').on('click', function() {
			$(this).closest('.alert').fadeOut();
		});
	})();
	
	
	// Browsehappy
	(function() {
		$('.browsehappy').click(function() {
			$(this).slideUp();
		});
	})();
	
	
	// Input type="file"
	;(function ( $, window, document, undefined ) {
		"use strict";
	
		var $files = $('.file');
	
		$files.each(function(index, el) {
			var $file = $(this);
			var $label = $file.find('.file__button');
			var $fileControl = $file.find('.file__control');
			var labelText = $label.text();
	
			$file.on('change', '.file__control', function(event) {
				// event.preventDefault();
	
				var fileName = '';
	
				if(this.files && this.files.length > 1) {
					fileName = ($(this).data('multiple-caption') || '').replace('{count}', this.files.length);
				}
				else {
					fileName = event.target.value.split( '\\' ).pop();
				}
	
				if( fileName ) {
					$label.text(fileName);
				}
				else {
					$label.text(labelText);
				}
			});
		});
	
	})( jQuery, window, document );
	
	
	// Header
	(function() {
		var $header    = $('.header');
		var $headerTop = $header.find('.header__top');
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
				'scrollTop': $target.offset().top - $heder.outerHeight() - 20
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
		});
	})();
	
	
	// Logo
	(function() {
		$('.logo').click(function(event) {
			event.preventDefault();
	
			$('html, body').stop().animate({
				'scrollTop': 0
			}, 900, 'swing');
		});
	})();
	
	
	// Mobile menu
	(function() {
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
	
				$('.page').addClass('page_mmenu-open', function(){
					$('.page').addClass('page_mmenu-open');
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
	
		$('.mobile-menu__item').each(function(index, el) {
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
	
	})();
	
	
	// Remodal
	(function() {
		$('[data-remodal-id]').remodal();
	})();
	
	
	// Dropdown
	(function() {
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
					// alert('Selected: "' + $(this).attr('data-value') + '" (' + $triggerText + ')');
					console.log('Selected: "' + $(this).attr('data-value') + '" (' + $triggerText + ')');
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
	})();
	

});
