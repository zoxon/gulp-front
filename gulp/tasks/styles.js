import gulp from "gulp";
import plumber from "gulp-plumber";
import stylus from "gulp-stylus";
import gcmq from "gulp-group-css-media-queries";
import prettier from "gulp-prettier";
import postcss from "gulp-postcss";

import { plumberConfig, stylusConfig } from "../config";
import bs from "../util/getBrowserSyncInstance";

export const css = () =>
  gulp
    .src(["*.styl", "!_*.styl"], { cwd: "source/styles" })
    .pipe(plumber(plumberConfig))
    .pipe(stylus(stylusConfig))
    .pipe(gcmq())
    .pipe(postcss())
    .pipe(prettier())
    .pipe(gulp.dest("dest/assets/stylesheets"))
    .pipe(bs.reload({ stream: true }));
