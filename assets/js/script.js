(function($) {

	/*!
	* jQuery Placeholder plugin for XHTML
	* 
	* Copyright (c) 2014 Weltkind Web Works
	* www.weltkind.com
	* 
	* @version 1.0.0
	*/
	jQuery.fn.placeholder = function(options) {

		var defaults = {
			title: $(this).val()
		};

		var obj = $(this);

		var options = $.extend(defaults, options);

		if (options.title !== $(this).val()) {
			$(this).val(options.title);
		}

		$(this).focus(function() {
			if ($(this).val() === options.title) {
				$(this).val('');
			}
		});
		$(this).focusout(function() {
			if ($(this).val() === '') {
				$(this).val(options.title);
			}
		});
	}

	/*!
	* jQuery form checker
	* 
	* Copyright (c) 2014 Weltkind Web Works
	* www.weltkind.com
	* 
	* @version 1.0.0
	*/
	jQuery.fn.formChecker = function() {

		var defaultFormValues = $(this).serializeArray();

		$(this).submit(function(event) {
			var currentFormValues = $(this).serializeArray();
			// console.log(currentFormValues);
			for (var key in defaultFormValues) {
				var defaultField = defaultFormValues[key];
				var currentField = currentFormValues[key];
				if (defaultField['value'] === currentField['value']) {
					$('#' + defaultField['name']).val('');
				}
			}
			// return false;
		});
	}

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
		var anim = new Array;

		var DoAnimate = function(value) {
			$ul.stop().animate(value, options.speed, function() {
				click = true;
			});
		};

		options.prevArrow.click(function() {
			if (click == true) {
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
			if (click == true) {
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


	/*!
	* Simple jQuery Equal Heights
	*
	* Copyright (c) 2013 Matt Banks
	* Dual licensed under the MIT and GPL licenses.
	* Uses the same license as jQuery, see:
	* http://docs.jquery.com/License
	*
	* @version 1.5.1
	*/
	$.fn.equalHeights = function() {
		var maxHeight = 0,
			$this = $(this);

		$this.each(function() {
			var height = $(this).innerHeight();

			if (height > maxHeight) {
				maxHeight = height;
			}
		});

		return $this.css('height', maxHeight);
	};

	// auto-initialize plugin
	$('[data-equal]').each(function() {
		var $this = $(this),
			target = $this.data('equal');
		$this.find(target).equalHeights();
	});


		/*!
	* jQuery raiting plugin
	* 
	* Copyright (c) 2014 Weltkind Web Works
	* www.weltkind.com
	* 
	* @version 1.0.0
	*/
	jQuery.fn.raiting = function(options){

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
			
			$(this).children('.b-star-raiting__current').width(rating*20+'%');

			field = $(this).attr('data-save-field');
			$('#'+field).val(rating);


		});

	}


})(jQuery);

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getIEVer() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) !== null) {
			rv = parseFloat(RegExp.$1);
		}
	}
	return rv;
}

$(document).ready(function() {
	
});