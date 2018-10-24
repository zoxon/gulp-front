import gulp from "gulp";
import ghPages from "gulp-gh-pages";

import { ghPagesConfig } from "../config";
import { build } from "./build";

export const publish = () =>
  gulp.src("**/*", { cwd: "dest" }).pipe(ghPages(ghPagesConfig));

export const deploy = gulp.series(build, publish);
