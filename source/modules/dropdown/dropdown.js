// dropdown
;(function ( $, window, document, undefined ) {
	'use strict';

	var ESCAPE_KEYCODE = 27;
	var ARROW_UP_KEYCODE = 38;
	var ARROW_DOWN_KEYCODE = 40;
	var RIGHT_MOUSE_BUTTON_WHICH = 3;

	var backdrop = '.dropdown-backdrop';
	var toggle = '[data-dropdown-role="dropdown"]';

	var Dropdown = function (element) {
		var options = $(this).data('dropdown-options');

		this.options = {};

		this.config = $.extend({}, this.options, options);

		$(element).on('click.dropdown', this.toggle);
	};

	function getParent($this) {
		var selector = $this.attr('data-target');

		if (!selector) {
			selector = $this.attr('href');
		}

		var $parent = selector && $(selector);

		return $parent && $parent.length ? $parent : $this.parent();
	}

	function clearMenus(event) {
		if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
			return;
		}

		$(backdrop).remove();

		$(toggle).each(function() {
			var $this = $(this);
			var $parent = getParent($this);
			var relatedTarget = { relatedTarget: this };

			if (!$parent.hasClass('dropdown_dropdown_open')) {
				return;
			}

			if (event && event.type === 'click' &&
				/input|textarea/i.test(event.target.tagName) &&
				$.contains($parent[ 0 ], event.target)) {
				return;
			}

			$parent.trigger(event = $.Event('dropdown.hide', relatedTarget));

			// Выходим, если клик пришелся на элемент внутри .dropdown__menu
			if (event && event.type === 'click' &&
				/dropdown__menu/i.test(event.toElement.offsetParent.className)) {
				return;
			}

			$this.attr('aria-expanded', 'false');
			$parent.removeClass('dropdown_dropdown_open')
				.trigger($.Event('dropdown.hidden', relatedTarget));
		});
	}

	Dropdown.prototype.toggle = function(event) {

		var $this = $(this);

		if ($this.is(':disabled')) {
			return;
		}

		var $parent = getParent($this);
		var isActive = $parent.hasClass('dropdown_dropdown_open');

		clearMenus();

		if (!isActive) {
			if ('ontouchstart' in document.documentElement) {

				// if mobile we use a backdrop because click events don't delegate
				$(document.createElement('div'))
					.addClass('dropdown-backdrop')
					.insertAfter($(this))
					.on('click', clearMenus);
			}

			var relatedTarget = { relatedTarget: this };
			$parent.trigger(event = $.Event('dropdown.show', relatedTarget));

			$this.trigger('focus').attr('aria-expanded', 'true');

			$parent.toggleClass('dropdown_dropdown_open')
				.trigger($.Event('dropdown.shown', relatedTarget));
		}

		return false;
	};

	Dropdown.prototype.keydown = function(event) {
		if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
			return;
		}

		var $this = $(this);

		event.preventDefault();
		event.stopPropagation();

		if ($this.is(':disabled')) {
			return;
		}

		var $parent = getParent($this);
		var isActive = $parent.hasClass('dropdown_dropdown_open');

		if (!isActive && event.which !== ESCAPE_KEYCODE ||
			isActive && event.which === ESCAPE_KEYCODE) {
			if (event.which === ESCAPE_KEYCODE) {
				$parent.find(toggle).trigger('focus');
			}
			return $this.trigger('click');
		}

		var $items = $parent.find('.dropdown__menu a, .dropdown__menu [tabindex]');

		if (!$items.length) {
			return;
		}

		var index = $items.index(event.target);

		// up
		if (event.which === ARROW_UP_KEYCODE && index > 0) {
			index--;
		}

		// down
		if (event.which === ARROW_DOWN_KEYCODE && index < $items.length - 1) {
			index++;
		}

		if (!~index) {
			index = 0;
		}

		$items.eq(index).trigger('focus');
	};


	// DROPDOWN PLUGIN DEFINITION
	// ==========================

	function Plugin(option) {
		return this.each(function() {
			var $this = $(this);
			var data  = $this.data('dropdown');

			if (!data) {
				$this.data('dropdown', (data = new Dropdown(this)));
			}

			if (typeof option == 'string') {
				data[ option ].call($this);
			}
		});
	}

	var old = $.fn.dropdown;

	$.fn.dropdown = Plugin;
	$.fn.dropdown.Constructor = Dropdown;


	// DROPDOWN NO CONFLICT
	// ====================

	$.fn.dropdown.noConflict = function() {
		$.fn.dropdown = old;
		return this;
	};


	// APPLY TO STANDARD DROPDOWN ELEMENTS
	// ===================================

	$(document)
		.on('click.dropdown.data-api', clearMenus)
		.on('click.dropdown.data-api', '.dropdown form', function(event) {
			event.stopPropagation();
		})
		.on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
		.on('keydown.dropdown.data-api', toggle, Dropdown.prototype.keydown)
		.on('keydown.dropdown.data-api', '.dropdown__menu', Dropdown.prototype.keydown);

})( jQuery, window, document );
