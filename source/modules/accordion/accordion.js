// accordion
(function($) {
	'use strict';

	/**
	 * Plugin name
	 * @type {String}
	 */
	var pluginName = 'accordion';

	/**
	 * Plugin default options
	 * @type {Object}
	 */
	var defaults = {
		class: {
			base: 'accordion',
			open: 'accordion__item_open'
		},
		speed: 300,
		onOpen: function() {},
		onClose: function() {}
	};

	/**
	 * accordion constructor
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
			this.bindEvents();
			this.openActiveItem();
		},

		// Remove plugin instance completely
		destroy: function() {
			this.unbindEvents();
			this.$element.removeData();
		},

		// Cache DOM nodes for performance
		buildCache: function() {
			this.$items = this.$element.find('[data-accordion-role="item"]');
			this.$triggers = this.$element.find('[data-accordion-role="trigger"]');
			this.$pannels = this.$element.find('[data-accordion-role="pannel"]');
		},

		// Bind events that trigger methods
		bindEvents: function() {
			var plugin = this;

			plugin.$triggers.on('click' + '.' + plugin._name, function(event) {
				plugin.toggle.call(plugin, event);
			});
		},

		// Unbind events that trigger methods
		unbindEvents: function() {
			this.$element.off('.' + this._name);
		},

		// Toggle accordion
		toggle: function(event) {
			var $trigger = $(event.target);
			var $item = $trigger.parents('[data-accordion-role="item"]');
			var $pannel = this.getItemPannel($item);

			if (!$item.hasClass(this.options.class.open)) {
				this.$items.removeClass(this.options.class.open);
				$item.addClass(this.options.class.open);
				this.$pannels.slideUp(this.options.speed);
				$pannel.slideDown(this.options.speed);
				this.$element.trigger('opened' + '.' + this._name);
				this.callback('onOpen');
			}
			else {
				$pannel.slideUp(this.options.speed);
				$item.removeClass(this.options.class.open);
				this.$element.trigger('closed' + '.' + this._name);
				this.callback('onClose');
			}
		},

		getItemPannel: function($item) {
			return $item.find('[data-accordion-role="pannel"]');
		},

		// Find first item with open class and open his pannel
		openActiveItem: function() {
			var plugin = this;

			this.$items.each(function() {
				var findActive = false;
				var $item = $(this);
				var $pannel = plugin.getItemPannel($item);

				if (!findActive) {
					if ($item.hasClass(plugin.options.class.open)) {
						$pannel.show();
						return false;
					}
				}
				else {
					$item.removeClass(plugin.options.class.open);
				}
			});
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
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin( this, options ));
			}
		});
	};

})(jQuery);

$(function() {
	$('.accordion').accordion();
});
