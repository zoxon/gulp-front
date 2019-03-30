import gulp from "gulp";
import plumber from "gulp-plumber";
import imagemin from "gulp-imagemin";
import svgSymbols from "gulp-svg-symbols";
import gulpIf from "gulp-if";
import rename from "gulp-rename";
import logger from "gulplog";

import { plumberConfig, imageminConfig, svgSymbolsConfig } from "../config";

function renameIconByFolderName(file) {
  const dirname = file.dirname.replace(/\./g, "").replace(/\//g, "-");
  const prevName = dirname
    ? `${file.dirname}/${file.basename}${file.extname}`
    : `${file.basename}${file.extname}`;
  const nextBasename = dirname ? `${dirname}_${file.basename}` : file.basename;
  const nextName = `${nextBasename}${file.extname}`;

  file.dirname = "";
  file.basename = nextBasename;

  logger.info(`Icon "${prevName}" renamed to "${nextName}"`);
}

export const icons = () =>
  gulp
    .src(["**/*.svg", "!**/_*.svg"], { cwd: "source/icons" })
    .pipe(plumber(plumberConfig))
    .pipe(imagemin(imageminConfig.icons))
    .pipe(rename(renameIconByFolderName))
    .pipe(svgSymbols(svgSymbolsConfig))
    .pipe(gulpIf(/\.styl$/, gulp.dest("tmp")))
    .pipe(gulpIf(/\.svg$/, rename("icons.svg")))
    .pipe(gulpIf(/\.svg$/, gulp.dest("dest/assets/images")));
