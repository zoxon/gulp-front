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


	$('.input').each(function(index, el) {
		var $input = $(this);
		var $box = $input.find('.input__box');
		var $control = $input.find('input[type="file"]');
		var placeholder = {
			file: $control.attr('placeholder') || 'Select file...',
			btn: 'Browse',
			multiple: 'Files selected: '
		}

		if ($control.length > 0) {
			$input.addClass('input_inited input_type_file');

			var $fileBtn = $('<span class="input__file-btn">' + placeholder.btn + '</span>').appendTo($box);
			var $fileName = $('<span class="input__file-name">' + placeholder.file + '</span>').appendTo($box);

			$fileBtn.add($fileName).on('click', function() {
				$(this).parents('.input').find('input[type="file"]').click();
			});
		}

		$control.change(function(event) {
			// Single file
			if (this.files.length == 1) {
				$fileName.text(this.files[0].name);
			}
			// Multiple files
			else if (this.files.length > 1) {
				$fileName.text(placeholder.multiple + this.files.length);
			}
		});
	});

})();
