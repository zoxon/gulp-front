import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import posthtml from "gulp-posthtml";
import prettify from "gulp-prettify";
import gulpIf from "gulp-if";
import { setup as emittySetup } from "emitty";

import getJsonData from "../util/getJsonData";
import { plumberConfig, posthtmlConfig, htmlPrettifyConfig } from "../config";
import data from "./data";

export const pages = () => {
  const pugConfig = {
    locals: getJsonData("./tmp/data.json")
  };

  return new Promise((resolve, reject) => {
    const emittyPug = emittySetup("source/pages", "pug");

    return emittyPug
      .scan(global.emittyChangedFile)
      .then(() => {
        gulp
          .src(["**/*.pug", "!**/_*.pug"], { cwd: "source/pages" })
          .pipe(plumber(plumberConfig))
          .pipe(
            gulpIf(global.watch, emittyPug.filter(global.emittyChangedFile))
          )
          .pipe(pug(pugConfig))
          .pipe(posthtml(posthtmlConfig.plugins, posthtmlConfig.options))
          .pipe(prettify(htmlPrettifyConfig))
          .pipe(gulp.dest("dest"))
          .on("end", resolve)
          .on("error", reject);
      })
      .catch(err => console.log(err));
  });
};

export const html = gulp.series(data, pages);
