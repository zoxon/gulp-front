import gulp from "gulp";
import plumber from "gulp-plumber";
import gulpIf from "gulp-if";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";

import { plumberConfig, imageminConfig } from "../config";
import { isDevelopment } from "../util/env";

export const assets = () => {
  return gulp
    .src(["**/*.*", "!**/_*.*"], { cwd: "source/assets" })
    .pipe(plumber(plumberConfig))
    .pipe(changed("dest/assets"))
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig.images)))
    .pipe(gulp.dest("dest/assets"));
};

export const staticFiles = () =>
  gulp
    .src("**/{*,.*}", { cwd: "source/public" })
    .pipe(plumber(plumberConfig))
    .pipe(gulp.dest("dest"));
