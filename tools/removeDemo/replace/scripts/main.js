import svg4everybody from "svg4everybody";

import * as serviceWorker from "@/scripts/helpers/serviceWorker";

import ready from "@/scripts/helpers/dom/ready";

import Alert from "@/modules/alert/alert";
import Accordion from "@/modules/accordion/accordion";
import Tabs from "@/modules/tabs/tabs";
import ProgressBar from "@/modules/progress-bar/progress-bar";
import Spoiler from "@/modules/spoiler/spoiler";
import Offcanvas from "@/modules/offcanvas/offcanvas";
import File from "@/modules/file/file";
import Dropdown from "@/modules/dropdown/dropdown";
import Code from "@/modules/code/code";
import Table from "@/modules/table/table";
import ScrollTop from "@/modules/scroll-top/scroll-top";
import StarRating from "@/modules/star-rating/star-rating";
import InputPassword from "@/modules/input/inputPassword";
import MainMenu from "@/modules/main-menu/main-menu";
import Tooltip from "@/modules/tooltip/tooltip";
import Modal from "@/modules/modal/modal";
import NetworkStatus from "@/modules/network-status/network-status";

// Factories class based plugins
Alert(".alert");
Accordion(".accordion");
Tabs(".tabs");
ProgressBar(".progress-bar");
Spoiler("[data-spoiler-target]");
Offcanvas();
File(".file");
Dropdown(".dropdown");
Code("pre.code");
Table(".table_responsive");
ScrollTop(".scroll-top");
StarRating(".star-rating");
InputPassword(".textfield_type_password");
NetworkStatus();

// Simple functional plugins
MainMenu();
Tooltip();
Modal();

ready(function() {
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
  File,
  Dropdown,
  Code,
  Table,
  ScrollTop,
  StarRating,
  InputPassword
};
