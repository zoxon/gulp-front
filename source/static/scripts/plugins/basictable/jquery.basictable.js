/*
 * jQuery Basic Table
 * Author: Jerry Low
 */

(function($) {
	$.fn.basictable = function(options) {
		var setup = function(table, data) {
			if (data.tableWrap) {
				table.wrap('<div class="' + settings.baseClass + '__wrapper"></div>');
			}

			var format = '';

			if (table.find('thead tr th').length) {
				format = 'thead tr th';
			}
			else if (table.find('th').length) {
				format = 'tr:first th';
			}
			else {
				format = 'tr:first td';
			}

			var headings = [];

			$.each(table.find(format), function() {
				var $heading = $(this);
				var colspan = parseInt($heading.attr('colspan'), 10) || 1;
				var row = $heading.closest('tr').index();

				if (!headings[row]) {
					headings[row] = [];
				}

				for (var i = 0; i < colspan; i++) {
					headings[row].push($heading);
				}
			});

			$.each(table.find('tbody tr'), function() {
				var $row = $(this);
				var cellIndex = 0;

				$row.children().each(function() {
					var $cell = $(this);

					if ($cell.html().trim() === '' || $cell.html() === '&nbsp;') {
						$cell.addClass(settings.baseClass + '__hide');
					}
					else {
						for (var i = 0; i < headings.length; i++) {
							var $heading = $(headings[i][cellIndex]);

							if ($heading.html() !== '' && $heading.html() !== '&nbsp;') {
								if( $cell.attr('data-th') ) {
									$cell.attr('data-th', $cell.attr('data-th') + ': ' + $heading.text());
								}
								else {
									$cell.attr('data-th', $heading.text());
								}

								if (data.contentWrap && !$cell.children().hasClass(settings.baseClass + '__content')) {
										$cell.wrapInner('<span class="' + settings.baseClass + '__content" />');
								}
							}
						}
					}

					cellIndex += $cell.attr('colspan') || 1;
				});
			});
		};

		var unwrap = function(table) {
			$.each(table.find('td'), function() {
				var $cell = $(this);
				var content = $cell.children('.' + settings.baseClass + '__content').html();
				$cell.html(content);
			});
		};

		var check = function(table, data) {
			// Only change when table is larger than parent if force
			// responsive is turned off.
			if (!data.forceResponsive) {
				if (table.removeClass(settings.baseClass + '_responsive').outerWidth() > table.parent().width()) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
			else {
				if ($(window).width() <= data.breakpoint) {
					start(table, data);
				}
				else {
					end(table, data);
				}
			}
		};

		var start = function(table, data) {
			table.addClass(settings.baseClass + '_responsive');

			if (data.tableWrapper) {
				table.parent('.' + settings.baseClass + 'wrapper').addClass(settings.baseClass + '__wrapper_active');
			}
		};

		var end = function(table, data) {
			table.removeClass(settings.baseClass + '_responsive');

			if (data.tableWrapper) {
				table.parent('.' + settings.baseClass + '__wrapper').removeClass(settings.baseClass + '__wrapper_active');
			}
		};

		var destroy = function(table, data) {
			table.find('td').removeAttr('data-th');

			if (data.tableWrap) {
				table.unwrap();
			}

			if (data.contentWrap) {
				unwrap(table);
			}

			table.removeData('basictable');
		};

		var resize = function(table) {
			if (table.data('basictable')) {
				check(table, table.data('basictable'));
			}
		};

		// Get table.
		var table = this;

		// If table has already executed.
		if (table.length === 0 || table.data('basictable')) {
			if (table.data('basictable')) {
				// Destroy basic table.
				if (options == 'destroy') {
					destroy(table, table.data('basictable'));
				}
				// Start responsive mode.
				else if (options === 'start') {
					start(table, table.data('basictable'));
				}
				else if (options === 'stop') {
					end(table, table.data('basictable'));
				}
				else {
					check(table, table.data('basictable'));
				}
			}
			return false;
		}

		// Extend Settings.
		var settings = $.extend({}, $.fn.basictable.defaults, options);

		var vars = {
			breakpoint: settings.breakpoint,
			contentWrap: settings.contentWrap,
			forceResponsive: settings.forceResponsive,
			noResize: settings.noResize,
			tableWrapper: settings.tableWrapper
		};

		// Initiate
		table.data('basictable', vars);

		setup(table, table.data('basictable'));

		if (!vars.noResize) {
			check(table, table.data('basictable'));

			$(window).bind('resize.basictable', function() {
				resize(table);
			});
		}
	};

	$.fn.basictable.defaults = {
		breakpoint: 568,
		contentWrap: true,
		forceResponsive: true,
		noResize: false,
		tableWrap: false,
		baseClass: 'bt'
	};
})(jQuery);
