// tabs
(function() {
	'use strict';

	/**
	 * Plugin name
	 * @type {String}
	 */
	var pluginName = 'tabs';

	/**
	 * Plugin default options
	 * @type {Object}
	 */
	var defaults = {
		class: {
			tab: {
				open: 'tabs__tab_active'
			},
			panel: {
				open: 'tabs__panel_active'
			}
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
		HOME: 36,
		END: 35,
		ENTER: 13,
		SPACE: 32
	};

	/**
	 * Tabs constructor
	 * @constructor
	 * @param {[jQuery]} element
	 * @param {[Object]} options
	 */
	function Plugin( element, options ) {

		this.element = element;
		this._name = pluginName;
		this._defaults = defaults;

		this.options = $.extend( {}, this._defaults, options );

		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {

		// Initialization logic
		init: function() {
			this.buildCache();
			this.bindEvents();

			this.setA11yAttrs();

			this.hidePreloader();
			this.open(this.tabsName, this.firstTabId);

			this.$first.attr('aria-describedby', this.descId);
		},

		// Remove plugin instance completely
		destroy: function() {
			this.unbindEvents();
			this.$element.removeData();
		},

		// Cache DOM nodes for performance
		buildCache: function() {
			this.$element = $(this.element);
			this.$tabs = this.$element.find('[data-tabs-target]');
			this.$first = this.$tabs.first();
			this.$panels = this.$element.find('[data-tabs-id]');
			this.$preloader = this.$element.find('[data-tabs-role="preloader"]');
			this.$desc = this.$element.find('[data-tabs-role="description"]');
			this.tabsName = this.$element.data('tabs-name');
			this.firstTabId = this.$tabs.eq(0).data('tabs-target');

			this.descId = this._name + '__description_index-' + Math.ceil(Math.random() * 1000);
			this.panelId = this._name + '__panel_index-' + this.options.count;
			this.triggerId = this._name + '__trigger_index-' + this.options.count;
			this.selected = 0;
		},

		// Bind events that trigger methods
		bindEvents: function() {
			var plugin = this;

			$(window).on('hashchange onpopstate', function() {
				plugin.onHashchangeHandler.call(plugin);
			}).trigger('hashchange');

			this.$tabs.on('focus' + '.' + plugin._name + ' click' + '.' + plugin._name, function(event) {
				event.preventDefault();

				var id = $(event.target).data('tabs-target');

				plugin.open(plugin.tabsName, id);

				window.location.hash = plugin.tabsName + '__' + id;
			});

			this.$tabs.on('keydown' + '.' + plugin._name, function(event) {
				plugin.handleKeydown.call(plugin, event);
			});
		},

		// Unbind events that trigger methods
		unbindEvents: function() {
			this.$element.off('.' + this._name);
		},

		open: function(tabsName, id) {
			var $tabsContainer = $('[data-tabs-name="' + tabsName + '"]');
			var $tabs = $tabsContainer.find('[data-tabs-target]');
			var $panels = $tabsContainer.find('[data-tabs-id]');
			var $targetTab = $tabsContainer.find('[data-tabs-target="' + id + '"]');
			var $targetPanel = $tabsContainer.find('[data-tabs-id="' + id + '"]');

			$tabs.attr({
					'tabindex': -1,
					'aria-selected': 'false'
				})
				.removeClass(this.options.class.tab.open);

			$targetTab.attr({
					'tabindex': 0,
					'aria-selected': 'true'
				})
				.addClass(this.options.class.tab.open);

			$panels.attr('aria-hidden', 'true')
				.removeClass(this.options.class.panel.open);

			$targetPanel.attr('aria-hidden', 'false')
				.addClass(this.options.class.panel.open);

			$(window).trigger('change' + '.' + this._name);
		},

		hidePreloader: function() {
			if (this.$preloader) {
				this.$preloader.hide();
			}
		},

		parseHash: function(hash) {
			var data = hash.split('__');
			return {
				'name': data[ 0 ],
				'id': data[ 1 ]
			};
		},

		onHashchangeHandler: function() {
			var hash = window.location.hash.replace('#', '');

			if (hash !== '') {
				var hashData = this.parseHash(hash);

				var $tabsContainer = $('[data-tabs-name="' + hashData.name + '"]');

				if ($tabsContainer.length) {
					if (typeof hashData.id !== undefined) {
						this.open(hashData.name, hashData.id);
					}
					else {
						this.open(hashData.name, this.firstTabId);
					}
				}
			}
		},

		handleKeydown: function(event) {
			var first = 0;
			var last = this.$tabs.length - 1;

			switch(event.which) {

				case KEYCODE.LEFT:
				case KEYCODE.UP:
					event.preventDefault();
					event.stopPropagation();

					if (this.selected === first) {
						this.selected = last;
					}
					else {
						this.selected--;
					}

					break;

				case KEYCODE.RIGHT:
				case KEYCODE.DOWN:
					event.preventDefault();
					event.stopPropagation();

					if (this.selected >= last) {
						this.selected = first;
					}
					else {
						this.selected++;
					}

					break;

				case KEYCODE.HOME:
					event.preventDefault();
					event.stopPropagation();

					this.selected = first;

					break;

				case KEYCODE.END:
					event.preventDefault();
					event.stopPropagation();

					this.selected = last;

					break;

				case KEYCODE.ENTER:
				case KEYCODE.SPACE:
					event.preventDefault();
					event.stopPropagation();

					break;
			}

			this.$tabs[ this.selected ].focus();
		},

		setA11yAttrs: function() {
			this.$tabs.parent().attr('role', 'tablist');

			this.$desc.attr('id', this.descId);

			this.$tabs
				.attr({
					'id': this.triggerId,
					'tabindex': '-1',
					'role': 'tab',
					'aria-selected': 'false',
					'aria-controls': this.panelId
				});


			this.$panels
				.attr({
					'id': this.panelId,
					'role': 'tabpanel',
					'aria-hidden': 'true',
					'aria-labelledby': this.triggerId
				});
		},

		// Universal calback call
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
	$('.tabs').tabs();
});
