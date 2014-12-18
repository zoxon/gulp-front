(function($) {

	/*!
	 * jQuery dropdown plugin
	 *
	 * Copyright (c) 2014 Weltkind Web Works
	 * www.weltkind.com
	 *
	 * @version 1.0.0
	 *
	 */
	$.fn.dropDown = function(options) {
		var defaults = {
			attribute: 'href',
			dropDownClass: $('.js-dropdown'),
			closestClass: '.js-dropdown-open'
		};

		var options = $.extend(defaults, options),
			$this = $(this);

		//Dropdown
		options.dropDownClass.hide();
		$this.click(function(e) {
			var $popup = $('#'+$(this).attr(options.attribute));

			if ($popup.css('display') != 'block') {
				$(document).bind('click.myDropdownClick', function(e) {
					if (!yourClick && $(e.target).closest(options.closestClass).length === 0) {
						options.dropDownClass.hide();
						$this.removeClass('js-dropdown_showed');
						$(document).unbind('click.myDropdownClick');
					}
					yourClick = false;
				});
				options.dropDownClass.hide();
				$this.removeClass('js-dropdown_showed');
				$popup.show();
				$(this).addClass('js-dropdown_showed');

				var yourClick = true;
			}

			e.preventDefault();
		});
	};

})(jQuery);