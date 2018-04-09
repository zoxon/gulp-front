import FastClick from "fastclick";
import svg4everybody from "svg4everybody";
import skrollr from "skrollr";
import ScrollReveal from "scrollreveal";

import ready from "../../modules/_utils/dom/ready";

import Alert from "../../modules/alert/alert";
import Accordion from "../../modules/accordion/accordion";
import Browsehappy from "../../modules/browsehappy/browsehappy";
import Tabs from "../../modules/tabs/tabs";
import ProgressBar from "../../modules/progress-bar/progress-bar";
import Spoiler from "../../modules/spoiler/spoiler";
import Offcanvas from "../../modules/offcanvas/offcanvas";
import File from "../../modules/file/file";
import Dropdown from "../../modules/dropdown/dropdown";
import Code from "../../modules/code/code";
import Table from "../../modules/table/table";
import Header from "../../modules/header/header";
import ScrollTop from "../../modules/scroll-top/scroll-top";
import StarRating from "../../modules/star-rating/star-rating";
import InputPassword from "../../modules/input/inputPassword";

Alert(".alert");
Accordion(".accordion");
Browsehappy(".browsehappy");
Tabs(".tabs");
ProgressBar(".progress-bar");
Spoiler();
Offcanvas();
File(".file");
Dropdown(".dropdown");
Code("pre.code");
Table(".table");
Header(".header");
ScrollTop(".scroll-top");
StarRating(".star-rating");
InputPassword(".input_type_password");

import "../../modules/demo/demo";
import "../../modules/main-menu/main-menu";
import "../../modules/tooltip/tooltip";
import "../../modules/modal/modal";

ready(function() {
  FastClick.attach(document.body);
  svg4everybody();

  skrollr.init({
    mobileCheck: function() {
      //hack - forces mobile version to be off
      return false;
    }
  });

  window.sr = ScrollReveal();

  /* globals sr */
  sr.reveal(".js-appearing-item", {
    origin: "bottom",
    distance: "10%",
    duration: 500,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0.1,
    scale: 0.99,
    easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
    container: window.document.documentElement,
    mobile: !1,
    reset: !1,
    useDelay: "always",
    viewFactor: 0.2,
    viewOffset: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    beforeReveal: function(e) {},
    beforeReset: function(e) {},
    afterReveal: function(e) {},
    afterReset: function(e) {}
  });
});
