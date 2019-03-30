import gulp from "gulp";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import gulpIf from "gulp-if";
import path from "path";
import logger from "gulplog";

import { plumberConfig, imageminConfig } from "../config";
import { isDevelopment } from "../util/env";

function renameFileByModuleName(file) {
  const f = path.parse(file.dirname);
  const nextBasename = f.dir + "__" + file.basename;
  const prevFileName = file.basename + file.extname;
  const nextFileName = nextBasename + file.extname;

  file.dirname = "";
  file.basename = nextBasename;

  logger.info(`File "${prevFileName}" renamed to "${nextFileName}"`);
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
