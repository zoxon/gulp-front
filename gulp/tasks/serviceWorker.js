import swPrecache from 'sw-precache';
import { isDevelopment } from '../util/env';

const serviceWorker = (callback) => {
  const rootDir = 'dest/';
  const config = {
    // Determines whether the `fetch` event handler is included in the generated service worker code. It is useful to set this to `false` in development builds, to ensure that features like live reload still work. Otherwise, the content would always be served from the service worker cache.
    handleFetch: !isDevelopment,
    staticFileGlobs: [
      rootDir + '**/*.{html,css,js}',
      rootDir + '**/*.{eot,ttf,woff,woff2}',
      rootDir + '**/*.{png,jpg,svg,ico}'
    ],
    stripPrefix: 'dest/',
    replacePrefix: '/'
  };

  swPrecache.write('dest/precache.js', config, callback);
};

export default serviceWorker;
