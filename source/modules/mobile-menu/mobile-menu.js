// Forms
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
})();
