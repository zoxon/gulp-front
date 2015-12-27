(function($) {
	/*!
	 * jQuery raiting plugin
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.0.0
	 */
	jQuery.fn.raiting = function(options) {

		var defaults = {
			elemWidth: 17
		};

		var options = $.extend(defaults, options);


		$(this).hover(function() {
			$(this).append('<div class="b-star-raiting__hover"></div>');
		}, function() {
			$(this).find(".b-star-raiting__hover").remove();
		});


		var rating;
		$(this).mousemove(function(e) {
			if (!e) e = window.event;
			if (e.pageX) {
				x = e.pageX;
			} else if (e.clientX) {
				x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;

			}
			var posLeft = 0;
			var obj = this;
			while (obj.offsetParent) {
				posLeft += obj.offsetLeft;
				obj = obj.offsetParent;
			}
			var offsetX = x - posLeft,
				modOffsetX = 5 * offsetX % this.offsetWidth;
			rating = parseInt(5 * offsetX / this.offsetWidth);

			if (modOffsetX > 0) rating += 1;

			$(this).find(".b-star-raiting__hover").eq(0).css("width", rating * options.elemWidth + "px");

		});

		/* Передача значений рейтинга */
		$(this).click(function() {
			// alert("Я ставлю " + rating);
			// return false;

			$(this).children('.b-star-raiting__current').width(rating * 20 + '%');

			field = $(this).attr('data-save-field');
			$('#' + field).val(rating);


		});

	};

})(jQuery);