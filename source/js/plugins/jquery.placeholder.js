(function($) {
	/*!
	 * jQuery Placeholder plugin for XHTML
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.2.0
	 */
	jQuery.fn.placeholder = function(options) {

		var defaults = {};

		var that = $(this),
			options = $.extend(defaults, options),
			value = '';

		that.each(function() {
			$(this).focus(function() {
				value = $(this).val();
				if ($(this).val() === value) {
					$(this).val('');
				}
			});
			$(this).focusout(function() {
				if ($(this).val() === '') {
					$(this).val(value);
				}
			});
		});

	};

})(jQuery);