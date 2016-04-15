$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('select, input').styler();

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	//= require ../../../tmp/modules.js

});
