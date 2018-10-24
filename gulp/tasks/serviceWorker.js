import path from "path";
import swPrecache from "sw-precache";
import logger from "gulplog";

import { isDevelopment } from "../util/env";

export const serviceWorker = callback => {
  const rootDir = "dest/";
  const config = {
    logger: logger.info,
    // Determines whether the `fetch` event handler is included in the generated service worker code. It is useful to set this to `false` in development builds, to ensure that features like live reload still work. Otherwise, the content would always be served from the service worker cache.
    handleFetch: !isDevelopment,
    staticFileGlobs: [
      rootDir +
        "/**/*.{js,html,css,png,jpg,jpeg,webp,gif,svg,eot,ttf,woff,woff2}"
    ],
    stripPrefix: rootDir,
    replacePrefix: "/"
  };

  swPrecache.write(path.join(rootDir, "service-worker.js"), config, callback);
};
