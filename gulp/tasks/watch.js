import gulp from "gulp";

import { reload } from "./server";
import { pages, html } from "./templates";
import { css } from "./styles";
import { scripts } from "./scripts";
import { icons } from "./icons";
import { sprite } from "./sprite";
import { moduleImages } from "./moduleImages";
import { assets, staticFiles } from "./assets";

export const watch = () => {
  global.watch = true;
  const testsPatterns = [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ];

  // Modules, pages
  gulp
    .watch("source/**/*.pug", gulp.series(pages, reload))
    .on("all", (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });

  // Modules data
  gulp.watch("source/modules/**/*.yml", gulp.series(html, reload));

  // Static styles
  gulp.watch("source/styles/**/*.styl", gulp.series(css));

  // Modules styles
  gulp.watch("source/modules/**/*.styl", gulp.series(css));

  // Static scripts
  gulp.watch(
    "source/scripts/**/*.js",
    { ignored: testsPatterns },
    gulp.series(scripts, reload)
  );

  // Modules scripts
  gulp.watch(
    "source/modules/**/*.js",
    { ignored: testsPatterns },
    gulp.series(scripts, reload)
  );

  // Modules images
  gulp.watch(
    "source/modules/*/images/**/*.{png,jpg,jpeg,gif,svg,webp}",
    gulp.series(moduleImages, reload)
  );

  // Assets
  gulp.watch("source/assets/**/*", gulp.series(assets, reload));

  // Svg icons
  gulp.watch("source/icons/**/*.svg", gulp.series(icons, css, reload));

  // Png sprites
  gulp.watch("source/sprite/**/*.png", gulp.series(sprite, reload));

  // Static files
  gulp.watch("source/public/**/{*,.*}", gulp.series(staticFiles));
};
