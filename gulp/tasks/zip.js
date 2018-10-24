import gulp from "gulp";
import gulpZip from "gulp-zip";

import getZipFileName from "../util/getZipFileName";
import { build } from "./build";

export const buildZip = () =>
  gulp
    .src("dest/**/*")
    .pipe(gulpZip(getZipFileName()))
    .pipe(gulp.dest("zip"));

export const zip = gulp.series(build, buildZip);
