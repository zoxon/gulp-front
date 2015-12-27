// Dropdown
$('.pseudo-dropdown').each(function(index, el) {
	var $that = $(this);
	var $trigger = $(this).find('.pseudo-dropdown__trigger');
	var $list = $(this).find('.pseudo-dropdown-list__item');
	var $active = $(this).find('.pseudo-dropdown-list__item_active');
	var $dropdown = $(this).find('.pseudo-dropdown__list');

	var $triggerText = '';

	// Set initial state
	if ($active.length > 0) {
		$triggerText = $active.text();
	}
	else {
		$triggerText = $list.first().text()
	}

	$trigger.text($triggerText);

	// Show dorpdown
	if (!$that.hasClass('pseudo-dropdown_dropdown_open')) {
		$trigger.click(function(event) {
			event.preventDefault();
			// Close all open dropdowns
			$('.pseudo-dropdown').removeClass('pseudo-dropdown_dropdown_open');
			$that.toggleClass('pseudo-dropdown_dropdown_open');
		});
	}

	// Dropdown item click
	$list.click(function(event) {
		event.preventDefault();

		var $triggerText = '';

		if ($(this).is('li') && $(this).text() != '') {
			$triggerText = $(this).text();
		}
		else {
			$triggerText = $(this).children('a').text();
		}
		$trigger.text($triggerText);

		$list.removeClass('pseudo-dropdown-list__item_active');
		$(this).addClass('pseudo-dropdown-list__item_active');

		$that.toggleClass('pseudo-dropdown_dropdown_open');

		if ($(this).attr('data-value').length > 0) {
			alert('Selected: "' + $(this).attr('data-value') + '" (' + $triggerText + ')');
		}
	});

	// Outer click
	$(document).on('click', function(event) {
		var closeClassName = 'pseudo-dropdown';
		var $hideObject = $('.pseudo-dropdown__list');

		if (!$(event.target).closest('.'+closeClassName).length) {
			if ($hideObject.is(":visible")) {
				$('.pseudo-dropdown').removeClass('pseudo-dropdown_dropdown_open');
			}
		}
	});
});
