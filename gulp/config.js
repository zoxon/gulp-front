import path from "path";

import imagemin from "gulp-imagemin";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg"; // need to run 'brew install libpng'
import imageminGiflossy from "imagemin-giflossy";
import posthtmlAttrsSorter from "posthtml-attrs-sorter";
import rupture from "rupture";

import errorHandler from "./util/errorHandler";
import stylusFileExists from "./util/stylusFileExists";

const CWD = process.cwd();

export const delConfig = ["dest", "tmp"];

export const plumberConfig = {
  errorHandler
};

export const browserSyncConfig = {
  server: "./dest",
  notify: false,
  reloadOnRestart: true,
  snippetOptions: {
    rule: {
      match: /<\/body>/i
    }
  }
};

// https://github.com/jescalan/accord/blob/master/docs/stylus.md
export const stylusConfig = {
  use: [rupture(), stylusFileExists()],
  include: [path.join(CWD, "node_modules")],
  "include css": true
};

export const htmlPrettifyConfig = {
  unformatted: ["pre", "code", "textarea", "script"],
  indent_char: " ",
  indent_size: 2,
  preserve_newlines: true,
  brace_style: "expand",
  end_with_newline: true
};

export const svgSymbolsConfig = {
  id: "%f",
  templates: [
    path.join(CWD, "gulp/templates/icons-template.styl"),
    path.join(CWD, "gulp/templates/icons-template.svg")
    // "default-svg"
  ],
  slug: function(name) {
    return name;
  },
  svgAttrs: {
    class: "icons-sprite",
    xmlns: "http://www.w3.org/2000/svg"
  }
};

export const spritesmithConfig = {
  retinaSrcFilter: "**/*@2x.png",
  imgName: "sprite.png",
  retinaImgName: "sprite@2x.png",
  cssName: "sprite.styl",
  algorithm: "binary-tree",
  padding: 8,
  cssTemplate: path.join(CWD, "gulp/templates/sprite-template.mustache")
};

export const imageminConfig = {
  images: [
    // png
    imageminPngquant({
      speed: 1,
      quality: 98 // lossy settings
    }),
    imageminZopfli({
      more: true
      // iterations: 50 // very slow but more effective
    }),

    // gif
    // imagemin.gifsicle({
    //   interlaced: true,
    //   optimizationLevel: 3
    // }),
    // gif very light lossy, use only one of gifsicle or Giflossy
    imageminGiflossy({
      optimizationLevel: 3,
      optimize: 3, //keep-empty: Preserve empty transparent frames
      lossy: 2
    }),

    // svg
    imagemin.svgo({
      plugins: [
        {
          removeViewBox: false
        }
      ]
    }),

    // jpg lossy
    // imageminJpegRecompress({
    //   progressive: true,
    //   max: 80,
    //   min: 70
    // })

    // jpg lossless
    imagemin.jpegtran({
      progressive: true
    }),

    // jpg very light lossy, use vs jpegtran
    imageminMozjpeg({
      quality: 90
    })
  ],

  icons: [
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { removeTitle: true },
        { removeStyleElement: true },
        {
          removeAttrs: {
            attrs: ["id", "class", "data-name", "fill", "fill-rule"]
          }
        },
        { removeEmptyContainers: true },
        { sortAttrs: true },
        { removeUselessDefs: true },
        { removeEmptyText: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: true },
        { transformsWithOnePath: true }
      ]
    })
  ]
};

export const posthtmlConfig = {
  plugins: [
    posthtmlAttrsSorter({
      order: [
        "class",
        "id",
        "name",
        "data",
        "ng",
        "src",
        "for",
        "type",
        "href",
        "values",
        "title",
        "alt",
        "role",
        "aria"
      ]
    })
  ],
  options: {}
};

export const ghPagesConfig = {
  branch: "build"
};
