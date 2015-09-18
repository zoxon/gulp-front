(function($) {

	$('.b-tabs .b-tabs__body-content').css({
		"opacity": "0",
		"display": "none"
	});

	$('.b-tabs').each(function() {

		$(this).find('.b-tabs__body-content').first().css({
			"opacity": "1",
			"padding-left": "0",
			"display": "block"
		});

		$(this).find('.b-tabs__head-item').first().addClass("b-tabs__head-item_active");

	});

	$(".b-tabs__head a").click(function(event) {
		event.preventDefault();
		$parent = $(this).parents('.b-tabs');

		$(this).parent().addClass("b-tabs__head-item_active");
		$(this).parent().siblings().removeClass("b-tabs__head-item_active");


		var tab = $(this).attr("href");
		$parent.find(".b-tabs__body-content").not(tab).css({
			"opacity": 0,
			"display": "none"
		});


		$(tab).css("display", "block").animate({
			paddingLeft: 0,
			opacity: 1
		}, 400);
	});



})(jQuery);
