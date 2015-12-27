(function($) {

	/*!
	 * jQuery link radio plugin
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.0.0
	 *
	 */
	jQuery.fn.linkRadio = function(options) {

		var defaults = {};

		var options = $.extend(defaults, options);

		var that = $(this);
		var currentValue = '';
		var input = that.find('input');
		var inputValue = '';


		that.find('.b-link-radio__item a').click(function(event) {
			var parent = $(this).parents('.b-link-radio');
			var thisInput = parent.find('input');

			if (!$(this).hasClass('b-link-radio__item_active')) {
				parent.find('.b-link-radio__item').removeClass('b-link-radio__item_active');
				$(this).parent().addClass('b-link-radio__item_active');

				currentValue = $(this).attr('rel');
				thisInput.val(currentValue);
			}
			event.preventDefault();
		});

		if (input.val() !== '') {
			that.find('.b-link-radio__item a').each(function() {
				inputValue = $(this).parents('.b-link-radio').find('input').val();

				if ($(this).attr('rel') == inputValue) {
					$(this).parents('.b-link-radio').find('.b-link-radio__item').removeClass('b-link-radio__item_active');
					$(this).parent().addClass('b-link-radio__item_active');
				}
			});
		}

	};

})(jQuery);