// Tabs
(function() {

	var $tabsWidgets = $('.tabs');


	if ($tabsWidgets.isset()) {
		$tabsWidgets.each(function() {
			var $tabWidget = $(this);
			var $tabs = $tabWidget.find('[data-tabs-target]');
			var tabsName = $tabWidget.data('tabs-name');
			var $preloader = $tabWidget.find('.tabs__preloader');
			var firstTabId = $tabs.eq(0).data('tabs-target');

			if ($preloader) {
				$preloader.hide();
			}

			showTab(tabsName, firstTabId);

			$(window).on('hashchange onpopstate', function() {
				var hash = window.location.hash.replace('#', '');

				if (hash !== '') {
					var hashData = parseHash(hash);

					var $tabsContainer = $('[data-tabs-name="' + hashData.name + '"]');

					if ($tabsContainer.isset()) {
						showTab(hashData.name, hashData.id);
					}
				}
			}).trigger('hashchange');

			$tabs.on('click', function(event) {
				event.preventDefault();
				var id = $(this).data('tabs-target');

				showTab(tabsName, id);

				window.location.hash = tabsName + '__' + id;
			});

			function parseHash(hash) {
				var data = hash.split('__');
				return {
					'name': data[ 0 ],
					'id': data[ 1 ]
				};
			}

			function showTab(tabsName, id) {
				var $tabsContainer = $('[data-tabs-name="' + tabsName + '"]');
				var $tabs = $tabsContainer.find('[data-tabs-target]');
				var $panels = $tabsContainer.find('[data-tabs-id]');
				var $targetTab = $tabsContainer.find('[data-tabs-target="' + id + '"]');
				var $targetPanel = $tabsContainer.find('[data-tabs-id="' + id + '"]');

				$tabs.removeClass('tabs__tab_active');
				$targetTab.addClass('tabs__tab_active');

				$panels.removeClass('tabs__panel_active');
				$targetPanel.addClass('tabs__panel_active');

				$(window).trigger('change.tabs');
			}
		});
	}

})();
