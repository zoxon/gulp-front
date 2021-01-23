import gulp from "gulp";

import { server } from "./server";
import { build } from "./build";
import { watch } from "./watch";

export const development = gulp.series(build, gulp.parallel(server, watch));
