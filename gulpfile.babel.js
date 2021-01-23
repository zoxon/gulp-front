import gulp from "gulp";
import { build } from "./gulp/tasks/build";
import { zip } from "./gulp/tasks/zip";
import { development } from "./gulp/tasks/development";
import { deploy } from "./gulp/tasks/deploy";
import { major, minor, patch, reset } from "./gulp/tasks/semver";

// Main tasks
gulp.task("build", build);
gulp.task("zip", zip);
gulp.task("development", development);
gulp.task("deploy", deploy);

// Semver
gulp.task("semver:major", major);
gulp.task("semver:minor", minor);
gulp.task("semver:patch", patch);
gulp.task("semver:reset", reset);

// Default task
gulp.task("default", gulp.series("development"));
