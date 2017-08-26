// Console polyfill
import './helpers/console.polyfill.js';


// FastclickJS
// Remove delay between a physical tap and the firing of a click event on mobile browsers.
import FastClick from 'fastclick';
$(() => {
  FastClick.attach(document.body);
});


// SVG4Everybody
import svg4everybody from 'svg4everybody';
svg4everybody();


// Helpers
import './plugins/helpers/jquery.isset.js';


// Basic table
// Responsive tables
import './plugins/basictable/jquery.basictable.js';

$(() => {
  $('.table').basictable({ baseClass: 'table' });
});


// Remodal
import 'remodal';
