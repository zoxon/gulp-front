import swPrecache from "sw-precache";
import logger from "gulplog";

import { isDevelopment } from "../util/env";
import swConfig from "../../sw-precache-config";

export const serviceWorker = done => {
  swConfig.logger = logger.info;
  swConfig.handleFetch = !isDevelopment;

  swPrecache.write("dest/sw.js", swConfig, done);
};
