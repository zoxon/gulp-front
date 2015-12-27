(function($) {

	/*!
	 * jQuery spinner plugin
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.0.0
	 *
	 */
	jQuery.fn.spinner = function(options) {

		var defaults = {
			onzero: function() {} // Запускается если значение поля 0
		};

		var options = $.extend(defaults, options);


		var input, minus, plus;
		input = $(this).find('input');
		minus = $(this).find('.js-minus-one');
		plus = $(this).find('.js-plus-one');

		// Обработка клика по +
		plus.click(function() {
			input = $(this).parent().find('input');
			var InpVal = parseInt(input.val(), 10);
			if (!isNaN(InpVal)) {
				input.val(InpVal + 1);
			} else {
				input.val(1);
			}
			return false;
		});

		// Фильтруем левые символы
		input.blur(function() {
			input = $(this).parent().find('input');
			var InpVal = parseInt(input.val(), 10);
			if (isNaN(InpVal)) {
				input.val(1);
			}
			if (InpVal < 1) {
				input.val(1);
				options.onzero.call(this);
			}
			return false;
		});

		minus.click(function() {
			input = $(this).parent().find('input');
			var InpVal = parseInt(input.val(), 10);
			if (!isNaN(InpVal)) {
				if (InpVal > 1) {
					input.val(InpVal - 1);
				} else {
					input.val(1);
					options.onzero.call(this);
				}
			} else {
				input.val(1);
			}
			return false;
		});


	};

})(jQuery);