import gulp from "gulp";
import plumber from "gulp-plumber";
import yaml from "gulp-yaml";
import mergeJson from "gulp-merge-json";

import { plumberConfig } from "../config";

const data = () =>
  gulp
    .src(["**/*.yml", "!**/_*.yml"], { cwd: "source/modules/*/data" })
    .pipe(plumber(plumberConfig))
    .pipe(yaml({ space: "\t" }))
    .pipe(mergeJson({ fileName: "data.json" }))
    .pipe(gulp.dest("tmp"));

export default data;
