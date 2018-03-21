import FastClick from "fastclick";
import svg4everybody from "svg4everybody";

// Console polyfill
import "./helpers/console.polyfill.js";

// FastclickJS
// Remove delay between a physical tap and the firing of a click event on mobile browsers.
FastClick.attach(document.body);

// SVG4Everybody
svg4everybody();

// eslint-disable-next-line global-require
import "./helpers/sw-precache-registration";
