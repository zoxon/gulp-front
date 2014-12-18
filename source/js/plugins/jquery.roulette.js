(function($) {
	/*!
	 * jQuery carusel plugin
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.0.0
	 */
	jQuery.fn.roulette = function(options) {

		var defaults = {
			speed: 300,
			direction: 'horizontal',
			prevArrow: $('.prev-arrow'),
			nextArrow: $('.next-arrow')
		};

		var options = $.extend(defaults, options);

		var click = true;
		var $this = $(this);
		var $ul = $(this).find('ul');

		if (options.direction == 'vertical') {
			var liSize = $ul.find('li').height() + parseInt($ul.find('li').css('margin-bottom')) + parseInt($ul.find('li').css('padding-bottom'));
			var ulSize = $ul.height();
			var maxMargin = ($ul.height() - $ul.parent().height()) * -1;
			var side = 'Top';
		} else if (options.direction == 'horizontal') {
			var liSize = $ul.find('li').width() + parseInt($ul.find('li').css('margin-right')) + parseInt($ul.find('li').css('padding-right'));
			var ulSize = $ul.width($ul.find('li').length * liSize);
			var maxMargin = ($ul.width() - $ul.parent().width()) * -1;
			var side = 'Left';
		}

		var newMargin = 0;
		var anim = [];

		var DoAnimate = function(value) {
			$ul.stop().animate(value, options.speed, function() {
				click = true;
			});
		};

		options.prevArrow.click(function() {
			if (click === true) {
				click = false;
				currentMargin = parseInt($ul.css('margin-' + side));
				newMargin = currentMargin + liSize;
				if (newMargin > 0) {
					anim['margin' + side] = maxMargin;
					DoAnimate(anim);
				} else {
					anim['margin' + side] = newMargin;
					DoAnimate(anim);
				}
			}
			return false;
		});

		options.nextArrow.click(function() {
			if (click === true) {
				click = false;
				currentMargin = parseInt($ul.css('margin-' + side));
				newMargin = currentMargin - liSize;
				if (newMargin < maxMargin) {
					anim["margin" + side] = 0;
					DoAnimate(anim);
				} else {
					anim["margin" + side] = newMargin;
					DoAnimate(anim);
				}
			}
			return false;
		});
	};

})(jQuery);