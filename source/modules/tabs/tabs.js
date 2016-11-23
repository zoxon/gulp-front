// Tabs
(function($, window, document, undefined) {
	'use strict';

	var $tabsContainer = $('.tabs');

	if ($tabsContainer.length) {
		$tabsContainer.each(function() {
			var $container = $(this);
			var $tabs = $container.find('[data-tabs-target]');
			var $panels = $container.find('[data-tabs-id]');
			var $preloader = $container.find('.tabs__preloader');

			if ($preloader) {
				$preloader.hide();
			}

			// Show first tab
			showTab($tabs.first());

			$tabs.on('click', function(event) {
				event.preventDefault();
				showTab($(this));
			});

			function showTab($tab) {
				var targetId = $tab.data('tabs-target');
				var $relatedTabs = $container.find('[data-tabs-target="' + targetId + '"]');
				var $targetPanel = $container.find('[data-tabs-id="' + targetId + '"]');

				$tabs.removeClass('tabs__tab_active');
				$relatedTabs.addClass('tabs__tab_active');

				$panels.removeClass('tabs__panel_active');
				$targetPanel.addClass('tabs__panel_active');

				$(window).trigger('change.tabs');
			}
		});
	}

})(jQuery, window, document);
