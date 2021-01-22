import gulp from "gulp";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import gulpIf from "gulp-if";
import path from "path";
import logger from "gulplog";

import { plumberConfig, imageminConfig } from "../config";
import { isDevelopment } from "../util/environment";

function renameFileByModuleName(file) {
  const { dirname, basename, extname } = file;
  const moduleNames =
    dirname.split(path.sep).filter((index) => index !== "images") || [];
  const newDirname = path.join(...moduleNames);

  const previousFileName = path.join(dirname, basename + extname);
  const nextFileName = path.join(newDirname, basename + extname);

  logger.info(`File "${previousFileName}" renamed to "${nextFileName}"`);

  file.dirname = newDirname;
}

export const moduleImages = () => {
  return gulp
    .src("**/*.{png,jpg,jpeg,gif,svg,webp}", { cwd: "source/modules/*/images" })
    .pipe(plumber(plumberConfig))
    .pipe(rename(renameFileByModuleName))
    .pipe(changed("dest/assets/images"))
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig.images)))
    .pipe(gulp.dest("dest/assets/images"));
};
