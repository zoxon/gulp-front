import gulp from "gulp";

import { server } from "./server";
import build from "./build";
import watch from "./watch";

const dev = gulp.series(build, gulp.parallel(server, watch));

export default dev;
