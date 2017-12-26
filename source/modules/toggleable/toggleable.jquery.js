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
