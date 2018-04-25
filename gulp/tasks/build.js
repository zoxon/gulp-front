import gulp from "gulp";

import cleanup from "./cleanup";
import { html } from "./html";
import icons from "./icons";
import sprite from "./sprite";
import moduleImages from "./moduleImages";
import { assets, staticFiles } from "./assets";
import scripts from "./scripts";
import css from "./css";
import serviceWorker from "./serviceWorker";
import { startMessage } from "./messages";
import { isDevelopment } from "../util/env";

const noop = done => done();

const build = gulp.series(
  startMessage,
  cleanup,
  gulp.series(
    gulp.parallel(
      html,
      icons,
      sprite,
      moduleImages,
      assets,
      staticFiles,
      scripts
    ),
    css,
    isDevelopment ? noop : serviceWorker
  )
);

export default build;
