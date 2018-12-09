import gulp from "gulp";

import { cleanup } from "./cleanup";
import { html } from "./templates";
import { icons } from "./icons";
import { sprite } from "./sprite";
import { moduleImages } from "./moduleImages";
import { staticFiles } from "./staticFiles";
import { scripts } from "./scripts";
import { css } from "./styles";
import { serviceWorker } from "./serviceWorker";
import { startMessage } from "./messages";
import { isDevelopment } from "../util/env";

const noop = done => done();

export const build = gulp.series(
  startMessage,
  cleanup,
  gulp.series(
    gulp.parallel(html, icons, sprite, moduleImages, staticFiles, scripts),
    css,
    isDevelopment ? noop : serviceWorker
  )
);
