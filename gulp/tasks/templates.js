import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import posthtml from "gulp-posthtml";
import prettify from "gulp-prettify";
import gulpif from "gulp-if";
import classNames from "classnames/dedupe";
import omit from "omit";
import { setup as emittySetup } from "@zoxon/emitty";

import getJsonData from "../util/getJsonData";
import { plumberConfig, posthtmlConfig, htmlPrettifyConfig } from "../config";
import { data } from "./data";

const emittyPug = emittySetup("source", "pug", {
  makeVinylFile: true
});

global.watch = false;
global.emittyChangedFile = {
  path: "",
  stats: null
};

export const pages = () => {
  const pugConfig = {
    locals: {
      ...getJsonData("./tmp/data.json"),
      _: {
        classNames,
        omit
      }
    }
  };

  const sourceOptions = global.watch ? { read: false } : {};

  return gulp
    .src("source/pages/**/*.pug", sourceOptions)
    .pipe(plumber(plumberConfig))
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats
        )
      )
    )
    .pipe(pug(pugConfig))
    .pipe(posthtml(posthtmlConfig.plugins, posthtmlConfig.options))
    .pipe(prettify(htmlPrettifyConfig))
    .pipe(gulp.dest("dest"));
};

export const html = gulp.series(data, pages);
