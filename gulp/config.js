import path from "path";

const CWD = process.cwd();

import gulpImagemin from "gulp-imagemin";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminPngquant from "imagemin-pngquant";
import posthtmlAttrsSorter from "posthtml-attrs-sorter";
import rupture from "rupture";

import errorHandler from "./util/errorHandler";
import stylusFileExists from "./util/stylusFileExists";

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
  unformatted: ["pre", "code", "textarea"],
  indent_char: " ",
  indent_size: 2,
  preserve_newlines: true,
  brace_style: "expand",
  end_with_newline: true
};

export const svgSymbolsConfig = {
  title: false,
  id: "%f",
  className: "%f",
  svgClassname: "icons-sprite",
  templates: [
    path.join(CWD, "gulp/templates/icons-template.styl"),
    path.join(CWD, "gulp/templates/icons-template.svg")
  ]
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
    gulpImagemin.gifsicle({
      interlaced: true,
      optimizationLevel: 3
    }),
    imageminJpegRecompress({
      progressive: true,
      max: 80,
      min: 70
    }),
    imageminPngquant({ quality: "75-85" }),
    gulpImagemin.svgo({
      plugins: [{ removeViewBox: false }]
    })
  ],

  icons: [
    gulpImagemin.svgo({
      plugins: [
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
