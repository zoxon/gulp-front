function getIEVer()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}

/* Плейсхолдеры */
// placeholder('.form #name', "<?= $this->translate()->_('Ваше имя') ?>");
function placeholder(selector, placeholdername) {

	$(selector).focus(function() {
		if ($(this).val() == placeholdername) {
			$(this).val('');
		}
	});
	$(selector).focusout(function() {
		if ($(this).val() == '') {
			$(this).val(placeholdername);
		}
	});
}

$(document).ready(function() {
	$('select').styler();
	$('.b-inline-form input[type="checkbox"], .b-inline-form input[type="radio"]').styler();

	$('.b-inline-form .item').children('.errors').parent().addClass('item_error');
});