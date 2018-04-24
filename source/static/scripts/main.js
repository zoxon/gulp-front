import FastClick from "fastclick";
import svg4everybody from "svg4everybody";

import * as serviceWorker from "./helpers/serviceWorker";

import ready from "@/modules/_utils/dom/ready";

import Alert from "@/modules/alert/alert";
import Accordion from "@/modules/accordion/accordion";
import Browsehappy from "@/modules/browsehappy/browsehappy";
import Tabs from "@/modules/tabs/tabs";
import ProgressBar from "@/modules/progress-bar/progress-bar";
import Spoiler from "@/modules/spoiler/spoiler";
import Offcanvas from "@/modules/offcanvas/offcanvas";
import File from "@/modules/file/file";
import Dropdown from "@/modules/dropdown/dropdown";
import Code from "@/modules/code/code";
import Table from "@/modules/table/table";
import Header from "@/modules/header/header";
import ScrollTop from "@/modules/scroll-top/scroll-top";
import StarRating from "@/modules/star-rating/star-rating";
import InputPassword from "@/modules/input/inputPassword";
import Demo from "@/modules/demo/demo";
import MainMenu from "@/modules/main-menu/main-menu";
import Tooltip from "@/modules/tooltip/tooltip";
import Modal from "@/modules/modal/modal";

// Factories class based plugins
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

// Simple functional plugins
Demo();
MainMenu();
Tooltip();
Modal();

ready(function() {
  FastClick.attach(document.body);
  svg4everybody();
});

// If you want your app to work offline and load faster, you can change
// `unregister()` to `register()` below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

module.exports = {
  Alert,
  Accordion,
  Tabs,
  ProgressBar,
  Spoiler,
  Offcanvas,
  File,
  Dropdown,
  Code,
  Table,
  Header,
  ScrollTop,
  StarRating,
  InputPassword
};
