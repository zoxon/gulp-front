/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/assets/favicons/android-chrome-144x144.png","81d0bdf134b7b86e7d5add9fbc30fdbb"],["/assets/favicons/android-chrome-192x192.png","7fce1c162d87985a8cf8c5472b639a93"],["/assets/favicons/android-chrome-256x256.png","62a231528e95e974d12c8e7e96844f07"],["/assets/favicons/android-chrome-36x36.png","e064e7a91cb8e94fddebced454879e0b"],["/assets/favicons/android-chrome-384x384.png","64b9d3a9d095b3a9a6ead8f3cfb5b14e"],["/assets/favicons/android-chrome-48x48.png","eb0617b294982f0d014e8ac6c87a6fdc"],["/assets/favicons/android-chrome-512x512.png","5375234e5f121cb1dcef4a00f41ae614"],["/assets/favicons/android-chrome-72x72.png","6b2800824e600db7f3952d86bdb8fb75"],["/assets/favicons/android-chrome-96x96.png","cae665d70b27f35633963e3e0a5a61a3"],["/assets/favicons/apple-touch-icon.png","54eb1cf50879ebdb1223d418a6f15388"],["/assets/favicons/favicon-16x16.png","56642076012a9b225d1e3ce20aaa95ff"],["/assets/favicons/favicon-32x32.png","607bf1aa38d98466d4c1abd12898533f"],["/assets/favicons/favicon.ico","469c622e70f673257aec02bc61c82aa4"],["/assets/favicons/mstile-144x144.png","81d0bdf134b7b86e7d5add9fbc30fdbb"],["/assets/favicons/mstile-150x150.png","2e25d67392570121dbe089176a0bf6b2"],["/assets/favicons/mstile-310x150.png","14c5d1b3a30ea28fcc92f4f7a9a9aed6"],["/assets/favicons/mstile-310x310.png","22f1c5165bad13a9903de146d6693f75"],["/assets/favicons/mstile-70x70.png","0c3a98119e6cf7de09714ee682682403"],["/assets/favicons/safari-pinned-tab.svg","6fdaa71163512fcfd6ff06d7bc782542"],["/assets/fonts/noto/sans/bold.eot","6d27c9e30f53c4e18c27ca9929185d9f"],["/assets/fonts/noto/sans/bold.ttf","42eac3cb16ee69c3bcccda035fa8a848"],["/assets/fonts/noto/sans/bold.woff","0cc5e5cd08dc3b381d4b3a4efd2409c9"],["/assets/fonts/noto/sans/bold.woff2","438a757fc3ce5b783c9d9b62ee659a48"],["/assets/fonts/noto/sans/bolditalic.eot","8165785e298cf5ebb24ed9c7849482d7"],["/assets/fonts/noto/sans/bolditalic.ttf","c26114d53c547d276208e36443e26a2e"],["/assets/fonts/noto/sans/bolditalic.woff","3d71f2fffe2feb6a850c3de8fa4864a3"],["/assets/fonts/noto/sans/bolditalic.woff2","a456aaeaf876887c9d4ee7a15df772f6"],["/assets/fonts/noto/sans/italic.eot","8c522570c442c90d7094190d23e27c19"],["/assets/fonts/noto/sans/italic.ttf","223ba7ee2df0bea6f9f60dccd01ffbfb"],["/assets/fonts/noto/sans/italic.woff","8635da48b87c23d61dfdfd05eae215a6"],["/assets/fonts/noto/sans/italic.woff2","face791ba1a323792beeddf662a570b9"],["/assets/fonts/noto/sans/regular.eot","b3a11473e7ab11bab7ac99d7dce8621e"],["/assets/fonts/noto/sans/regular.ttf","2915a204d1a48ed7b612c1e6254c9ce2"],["/assets/fonts/noto/sans/regular.woff","eb7c455e89813982187a41c37effad54"],["/assets/fonts/noto/sans/regular.woff2","27843ab7350fee6d9385dacc4e7aa0dc"],["/assets/fonts/noto/serif/bold.eot","e30959f2e1900824961c9fdab2d97193"],["/assets/fonts/noto/serif/bold.ttf","aee15fd0eb82f6b7abd3a0d3a4a516b3"],["/assets/fonts/noto/serif/bold.woff","56db9cfc7180f73c615cd06ac6955a62"],["/assets/fonts/noto/serif/bold.woff2","507d78470d75cca7025da2944af30572"],["/assets/fonts/noto/serif/bolditalic.eot","42d3da50743c27ee4acad520be3fcc28"],["/assets/fonts/noto/serif/bolditalic.ttf","e9fc8c42ed0234af934115ce01f95cde"],["/assets/fonts/noto/serif/bolditalic.woff","4e466aaae170b391b266c767f60ee9c1"],["/assets/fonts/noto/serif/bolditalic.woff2","3eee15611013dcb9f8f245b2d5897142"],["/assets/fonts/noto/serif/italic.eot","286d6ea63c10db78c23084e6520ca3d4"],["/assets/fonts/noto/serif/italic.ttf","1456f5d056b03129d7df7db4081aa480"],["/assets/fonts/noto/serif/italic.woff","2d55102d732ef2b7fa7a93ffe1a57318"],["/assets/fonts/noto/serif/italic.woff2","ae3bd4111f51405d37e55e7c7474bb16"],["/assets/fonts/noto/serif/regular.eot","2d62da2e64f151f29179ec278e23d1ce"],["/assets/fonts/noto/serif/regular.ttf","d36e024ce0bd1a83e8c2367055dae8a9"],["/assets/fonts/noto/serif/regular.woff","4b93d9ac0d50c8214375ef2b62a57de9"],["/assets/fonts/noto/serif/regular.woff2","23d0687e2da1690af7579ff1fe35059e"],["/assets/images/content/preview.png","79b71585e4689fe3d1465c5dbdcfe4fa"],["/assets/images/content/preview_small.png","b742e50127505de4081125d2fbeb3958"],["/assets/images/form__captcha.png","e9537ddb0465f58ac10afcee1fc690e1"],["/assets/images/icons.svg","7f723fe8df6c6d6419ae8b683fb2f03a"],["/assets/images/sprite.png","2d28ff324e4ccdb92cbc3c4d88e612c9"],["/assets/images/sprite@2x.png","2659a452e09ea7027cd3a76c7003d0ac"],["/assets/images/tabs__preloader.svg","ef88b3ba366972f1863edef5c0553aae"],["/assets/javascripts/main.js","856849fedbb67491eb21031a97fb9c3b"],["/assets/javascripts/vendor.js","a5e5aa0e3bb9c4ced62dab70358e6328"],["/assets/stylesheets/main.css","dfdf5d7d88f2bf2fa43110a82327f067"],["/assets/stylesheets/reset.css","0c19a02775ed9fb145457b2d4b70911a"],["/home.html","384d8f93f2ba606d524d7125daea40ba"],["/index.html","a2b78af286378c7f2653b679f59d6c0e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







