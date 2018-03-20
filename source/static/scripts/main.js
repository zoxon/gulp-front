// Precache Service Worker
import "./helpers/sw-precache-registration";

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

import "../../modules/demo/demo";
import "../../modules/header/header";
import "../../modules/main-menu/main-menu";
import "../../modules/logo/logo";
import "../../modules/tooltip/tooltip";
import "../../modules/modal/modal";
