Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'js/placeholders.min.js'
	},
	{
		test: Modernizr.touch,
		yep: ['js/fastclick.min.js'],
		complete: function(){
			if (Modernizr.touch) {
				FastClick.attach(document.body);
			}
		}
	},
	{
		test: Modernizr.svg,
		nope: 'js/svg4everybody.legacy.js',
		complete: function() {
			// Svg falback, replace all .svg to .png in <img src="" />
			if (!Modernizr.svg) {
				var imgs = document.getElementsByTagName('img');
				var svgExtension = /.*\.svg$/
				var l = imgs.length;
				for (var i = 0; i < l; i++) {
					if (imgs[i].src.match(svgExtension)) {
						imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
						console.log(imgs[i].src);
					}
				}
			}
		}
	}
]);


$(document).ready(function() {
	$('select, input').styler();

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	//= require ../../../tmp/modules.js

});
