import gulp from "gulp";
import bump from "gulp-bump";

export const major = () =>
  gulp
    .src("package.json")
    .pipe(bump({ type: "major" }))
    .pipe(gulp.dest("./"));

export const minor = () =>
  gulp
    .src("package.json")
    .pipe(bump({ type: "minor" }))
    .pipe(gulp.dest("./"));

export const patch = () =>
  gulp
    .src("package.json")
    .pipe(bump())
    .pipe(gulp.dest("./"));

export const reset = () =>
  gulp
    .src("package.json")
    .pipe(bump({ version: "0.1.0" }))
    .pipe(gulp.dest("./"));
