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

			$that.on('mouseenter.tooltip click.tooltip', function(event) {
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
			});


			$that.on('mouseleave.tooltip', function() {
				$tooltip.removeClass('tooltip_visible');
			});

			$(document).on('click', function(event) {
				if (!$(event.target).closest($that).length) {
					$tooltip.removeClass('tooltip_visible');
				}
			});

			$(window).on('scroll touchmove', function() {
				if ($tooltip.hasClass('tooltip_visible')) {
					$tooltip.removeClass('tooltip_visible');
				}
			});

		});
	}


})();
