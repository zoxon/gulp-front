'use strict';

$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('.table').basictable({ baseClass: 'table' });

	// Here insert modules scripts
	//= require source/modules/**/!(_)*.js

});
