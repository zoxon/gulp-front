// accordion
(function() {
	var $accordions = $('.accordion');

	if ($accordions.isset()) {
		$accordions.each(function() {
			var $that = $(this);
			var $items = $that.find('.accordion__item');
			var $headers = $that.find('.accordion__header');
			var $contents = $that.find('.accordion__content');
			var speed = 300;

			$items.each(function() {
				var findActive = false;
				var $item = $(this);

				if (!findActive) {
					if ($item.hasClass('accordion__item_active')) {
						$item.children('.accordion__content').show();
						return false;
					}
				}
				else {
					$item.removeClass('accordion__item_active');
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
	}

})();
