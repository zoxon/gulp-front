// Forms
(function() {
	var setFormFieldState = function(block, control) {
		var $block = $('.' + block);

		$block.each(function(index, el) {
			var $that = $(this);
			var $control = $that.find('.' + block + '__' + control);

			// Focus
			$control.focusin(function(event) {
				$(this).parents('.' + block).addClass(block + '_focused');
			});

			$control.focusout(function(event) {
				$(this).parents('.' + block).removeClass(block + '_focused');
			});

			// Checked
			if ($control.is(':checked')) {
				$that.addClass(block + '_checked');
			}

			$control.click(function(event) {
				$('input:not(:checked)').parents('.' + block).removeClass(block + '_checked');
				$('input:checked').parents('.' + block).addClass(block + '_checked');
			});

			// Disabled
			if ($control.is(':disabled')) {
				$that.addClass(block + '_disabled');
			}

			// Multiple
			if ($control.is('[multiple]')) {
				$that.addClass(block + '_multiple');
			}

			$that.addClass(block + '_inited');
		});
	};


	setFormFieldState('select', 'control');
	setFormFieldState('input', 'control');
	setFormFieldState('textarea', 'control');
	setFormFieldState('checkbox', 'control');
	setFormFieldState('radio', 'control');


	$('input[type="file"]').each(function(index, el) {
		var $that = $(this);
		$that.change(function(event) {
			$(this).each(function(index, el) {
				console.log(el.files[index].name);
			});
		});
	});
})();
