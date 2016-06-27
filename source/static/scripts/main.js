'use strict';

$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Here insert modules scripts
	//= require tmp/modules.js

});
