import gulp from "gulp";
import spritesmith from "gulp.spritesmith";
import imagemin from "gulp-imagemin";
import buffer from "vinyl-buffer";
import gulpIf from "gulp-if";

import { spritesmithConfig, imageminConfig } from "../config";
import { isDevelopment } from "../util/env";

export const sprite = () => {
  let spriteData = gulp
    .src(["**/*.png", "!**/_*.png"], { cwd: "source/sprite" })
    .pipe(spritesmith(spritesmithConfig));

  spriteData.img
    .pipe(buffer())
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig.images)))
    .pipe(gulp.dest("dest/assets/images"));

  spriteData.css.pipe(buffer()).pipe(gulp.dest("tmp"));

  return spriteData.img.pipe(buffer());
};
