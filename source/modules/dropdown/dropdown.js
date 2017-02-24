// dropdown
(function() {
	'use strict';

	/**
	 * Plugin name
	 * @type {String}
	 */
	var pluginName = 'dropdown';

	/**
	 * Plugin default options
	 * @type {Object}
	 */
	var defaults = {
		outerClick: true,
		class: {
			base: 'dropdown',
			open: 'dropdown_open',
			disabled: 'dropdown_disabled'
		}
	};

	/**
	 * Keyboard key codes
	 * @type {Object}
	 */
	var KEYCODE = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		ESCAPE: 27,
		TAB: 9
	};

	/**
	 * Dropdown constructor
	 * @constructor
	 * @param {[jQuery]} element
	 * @param {[Object]} options
	 */
	function Plugin(element, options) {
		this.element = element;
		this._name = pluginName;
		this._defaults = defaults;

		this.$element = $(this.element);

		this.metadata = this.$element.data(this._name + '-' + 'options');

		this.options = $.extend( {}, this._defaults, options, this.metadata );

		this.init();
	}

	$.extend(Plugin.prototype, {

		// Initialization logic
		init: function() {
			this.buildCache();
			this.setA11yAttrs();

			if (this.isDisabled()) {
				this.setDisabledState();
			}
			else {
				this.bindEvents();
			}
		},

		// Remove plugin instance completely
		destroy: function() {
			this.unbindEvents();
			this.$element.removeData();
		},

		// Cache DOM nodes for performance
		buildCache: function() {
			this.$trigger = this.$element.find('[data-dropdown-role="trigger"]');
			this.$dropMenu = this.$element.find('[data-dropdown-role="drop-menu"]');
			this.focusableElements = this.$dropMenu.find('*[tabindex], a[href]');
			this.selected = 0;
			this.triggerId = this._name + '_trigger_' + this.options.count;
		},

		// Bind events that trigger methods
		bindEvents: function() {
			var plugin = this;

			plugin.$trigger.on('click' + '.' + plugin._name, function(event) {
				plugin.toggle.call(plugin, event);
			});

			plugin.$trigger.add(this.focusableElements)
				.on('keydown' + '.' + plugin._name, function(event) {
					plugin.handleKeydown.call(plugin, event);
				});

			$(document).on('click' + '.' + plugin._name, function(event) {
				plugin.outerClickHandler.call(plugin, event);
			});
		},

		// Unbind events that trigger methods
		unbindEvents: function() {
			this.$element.off('.' + this._name);
		},

		open: function() {
			if (!this.isOpen()) {
				this.$element.addClass(this.options.class.open)
					.trigger('opened' + '.' + this._name);
				this.$trigger.attr('aria-expanded', true);
			}
		},

		close: function() {
			this.$element.removeClass(this.options.class.open).trigger('closed' + '.' + this._name);
			this.$trigger.attr('aria-expanded', false);
		},

		// Return true when dropdown is open
		isOpen: function() {
			var open = false;

			if (this.$element.hasClass(this.options.class.open)) {
				open = true;
			}

			return open;
		},

		// Return true when dropdown disabled
		isDisabled: function() {
			var disabled = false;

			if (this.$element.hasClass(this.options.class.disabled)) {
				disabled = true;
			}

			return disabled;
		},

		// Toggle dropdown
		toggle: function() {
			if (this.isOpen()) {
				this.close();
			}
			else {
				this.open();
			}
		},

		// Click outside
		outerClickHandler: function(event) {
			if (this.options.outerClick && this.isOpen()) {
				if (!$(event.target).closest(this.$element).length) {
					this.close();
				}
			}
		},

		// Keydown handler
		handleKeydown: function(event) {

			if (this.isDisabled()) {
				return;
			}

			switch (event.which) {

				case KEYCODE.ESCAPE:
					// this.close();

					console.log(this.$trigger);
					this.$trigger.focus();

					break;

				case KEYCODE.UP:
				case KEYCODE.LEFT:

					event.preventDefault();

					this.open();

					if (this.selected === 0) {
						this.selected = this.focusableElements.length - 1;
					}
					else {
						this.selected--;
					}
					break;

				case KEYCODE.DOWN:
				case KEYCODE.RIGHT:

					event.preventDefault();

					this.open();

					if (this.selected === this.focusableElements.length - 1) {
						this.selected = 0;
					}
					else {
						this.selected++;
					}

					break;
			}

			this.focusableElements[ this.selected ].focus();
		},

		setA11yAttrs: function() {
			this.$trigger.attr({
				'aria-haspopup': true,
				'aria-expanded': false,
				'id': this.triggerId
			});

			this.$dropMenu.attr({
				'aria-labelledby': this.triggerId
			});
		},

		setDisabledState: function() {
			this.$element.attr('aria-disabled', true);
			this.$trigger.attr('disabled', true);
		},

		// Call calback by name
		callback: function(name) {
			var cb = this.options[ name ];

			if ( typeof cb === 'function' ) {
				cb.call(this.element);
			}
		}

	});

	$.fn[ pluginName ] = function( options ) {
		return this.each(function(index) {
			options = $.extend(options, { 'count': index } );

			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin( this, options ));
			}
		});
	};

})();


$(function() {
	$('.dropdown').dropdown();
});
