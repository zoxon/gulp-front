'use strict';

svg4everybody();

FastClick.attach(document.body);

$('.table').basictable({ baseClass: 'table' });

// Modules
// accordion
(function() {
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
		toggle: function() {
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
		return this.each(function(index) {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin( this, options ));
			}
		});
	};

})();

$(function() {
	$('.accordion').accordion();
});

// alert
(function() {

	var $alerts = $('.alert');

	if ($alerts.isset()) {
		$alerts.each(function() {
			var $alert = $(this);
			var $close = $alert.find('.alert__close');

			$close.on('click', function(event) {
				event.preventDefault();
				$alert.fadeOut();
			});
		});
	}

})();

// browsehappy
(function() {

	$('.browsehappy').click(function() {
		$(this).slideUp();
	});

})();

// demo
(function() {

	$.getJSON('http://ip-api.com/json',
		function(json) {
			$('#form-demo__ip').val(json.query);
			$('#form-demo__city').val(json.city);
			$('#form-demo__country').val(json.country);
		}
	);

})();

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
			if (this.isOpen()) {
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

// file
(function() {

	var $files = $('.file');

	if ($files.isset()) {
		$files.each(function() {
			var $file = $(this);
			var $label = $file.find('.file__button');

			// var $fileControl = $file.find('.file__control');
			var labelText = $label.text();

			$file.on('change', '.file__control', function(event) {
				var fileName = '';

				if (this.files && this.files.length > 1) {
					fileName = ($(this).data('multiple-caption') || '')
						.replace('{count}', this.files.length);
				}
				else {
					fileName = event.target.value.split( '\\' ).pop();
				}

				if ( fileName ) {
					$label.text(fileName);
				}
				else {
					$label.text(labelText);
				}
			});
		});
	}

})();

// Header
(function() {

	function headerScrollHandler() {
		var top = $(window).scrollTop();
		var fixed = false;

		if (top > 0) {
			fixed = true;
		}

		$('.header').toggleClass('header_fixed', fixed);
	}

	$(window).on('scroll', $.debounce( 150, headerScrollHandler ))
		.trigger('scroll');

})();

// Logo
(function() {

	$('.logo').click(function(event) {
		event.preventDefault();

		$('html, body').stop().animate({
			'scrollTop': 0
		}, 900, 'swing');
	});

})();

// main-menu
(function() {

	var $mainMenus = $('.main-menu');

	if ($mainMenus.isset()) {
		$mainMenus.each(function() {
			var $menu = $(this);
			var $links = $menu.find('a[href^="#"]');
			var offset = parseInt($('.header__top').outerHeight());
			var animSpeed = 700;

			// Scroll on click
			$links.on('click', function(event) {
				event.preventDefault();
				var $link = $(this);

				var hash = $link.attr('href');
				var $target = $(hash);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - offset - 20
				}, animSpeed, 'swing', function() {
					window.location.hash = hash;
				});
			});

		});
	}

})();

// mobile-menu-trigger
(function() {

	var $trigger = $('.mobile-menu-trigger');
	var $page = $('.page');

	$trigger.on('click', function(event) {
		event.preventDefault();
		$page.toggleClass('page_mobile-menu_open');
	});

})();

// mobile-menu
(function() {

	var $mobileMenus = $('.mobile-menu');
	var animSpeed = 400;

	if ($mobileMenus.isset()) {
		$mobileMenus.each(function() {
			var $mobileMenu = $(this);
			var $items = $mobileMenu.find('.mobile-menu__item');
			var $submenus = $mobileMenu.find('.mobile-menu__submenu');

			$items.on('click', function() {
				var $item = $(this);
				var $submenu = $item.find('.mobile-menu__submenu');

				if ($submenu.isset()) {
					$submenu.slideDown(animSpeed);
					$submenus.not($submenu).slideUp(animSpeed);
				}
			});
		});
	}

})();

// Remodal
$(function() {
	$('[data-remodal-id]').remodal();
});

// page
(function() {
	var $page = $('.page');
	var $cover;

	$cover = $('<div class="page__cover">').appendTo($page);

	$cover.on('click', function(event) {
		event.preventDefault();

		if ($page.hasClass('page_mobile-menu_open')) {
			$page.removeClass('page_mobile-menu_open');
		}
	});

})();

// progress-bar
(function() {

	var $progressBars = $('.progress-bar');

	if ($progressBars.isset()) {
		$progressBars.each(function() {
			var $progress = $(this);
			var $progressBar = $progress.children('.progress-bar__bar');
			var value = $progress.data('progres-value');

			$progressBar.css({ 'width': value * 100 + '%' });
		});
	}


})();

// spoiler
(function() {

	var $spoilers = $('[data-spoiler-target]');

	if ($spoilers.isset()) {
		$spoilers.each(function() {
			var $spoiler = $(this);
			var targetId = $spoiler.data('spoiler-target');
			var $target = $('[data-spoiler-id="' + targetId + '"]');
			var animationSpeed = 300;

			$target.hide();

			$spoiler.click(function() {
				$target.slideToggle(animationSpeed);
			});
		});
	}


})();

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

			this.$tabs.on('focus' + '.' + plugin._name, function(event) {
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

// toggleable
(function() {

	var $togglers = $('[data-toggleable-target]');

	if ($togglers.isset()) {
		var toggleable = {
			getState: function($elem) {
				var toggleState = $elem.data('toggleable-state');

				if (typeof toggleState === 'undefined' ||
					(toggleState !== 'on' && toggleState !== 'off')) {
					toggleState = 'off';
				}

				return toggleState;
			},

			invertState: function(state) {
				if (state === 'off') {
					state = 'on';
				}
				else {
					state = 'off';
				}

				return state;
			},

			applyState: function($target, state) {
				$target.data('toggleable-state', state).trigger('update.toggleable');
			},

			setState: function($button, $target, state) {
				toggleable.applyState($button, state);
				toggleable.applyState($target, state);
			}
		};

		$togglers.each(function() {
			var $thisButton = $(this);
			var toggleState = toggleable.getState($thisButton);

			var targetId = $thisButton.data('toggleable-target');
			var $target = $('[data-toggleable-id="' + targetId + '"]');

			// Set current state to target
			toggleable.setState($thisButton, $target, toggleState);

			$thisButton.on('click', function() {
				var currentState = toggleable.getState($thisButton);
				var state = toggleable.invertState(currentState);

				toggleable.setState($thisButton, $target, state);

			});
		});
	}


})();

// Tooltip
(function() {

	var cssClasses = {
		visible: 'tooltip_visible',
		bottom: 'tooltip_bottom',
		left: 'tooltip_left',
		right: 'tooltip_right',
		top: 'tooltip_top'
	};

	var $tooltips = $('[data-tooltip-id]');

	if ($tooltips.isset()) {
		$tooltips.each(function() {
			var that = this;
			var $that = $(that);
			var tooltipId = $that.data('tooltip-id');
			var $tooltip = $('[data-tooltip-target="' + tooltipId + '"]').first();

			$that.hover(function() {
				var props = event.target.getBoundingClientRect();
				var left = props.left + (props.width / 2);
				var top = props.top + (props.height / 2);
				var marginLeft = -1 * ($tooltip.outerWidth() / 2);
				var marginTop = -1 * ($tooltip.outerHeight() / 2);
				var tooltipPos = {};

				if ($tooltip.hasClass(cssClasses.left) || $tooltip.hasClass(cssClasses.right)) {
					left = (props.width / 2);
					if (top + marginTop < 0) {
						tooltipPos.top = '0';
						tooltipPos.marginTop = '0';
					}
					else {
						tooltipPos.top = top + 'px';
						tooltipPos.marginTop = marginTop + 'px';
					}
				}
				else {
					if (left + marginLeft < 0) {
						tooltipPos.left = '0';
						tooltipPos.marginLeft = '0';
					}
					else {
						tooltipPos.left = left + 'px';
						tooltipPos.marginLeft = marginLeft + 'px';
					}
				}

				if ($tooltip.hasClass(cssClasses.top)) {
					tooltipPos.top = props.top - $tooltip.outerHeight() - 10 + 'px';
				}
				else if ($tooltip.hasClass(cssClasses.right)) {
					tooltipPos.left = props.left + props.width + 10 + 'px';
				}
				else if ($tooltip.hasClass(cssClasses.left)) {
					tooltipPos.left = props.left - $tooltip.outerWidth() - 10 + 'px';
				}
				else {
					tooltipPos.top = props.top + props.height + 10 + 'px';
				}

				$tooltip.css(tooltipPos).addClass(cssClasses.visible);

			}, function() {
				$tooltip.removeClass('tooltip_visible');
			});
		});
	}


})();

