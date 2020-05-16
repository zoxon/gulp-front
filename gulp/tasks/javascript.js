import path from "path";
import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import logger from "gulplog";

import { isDevelopment, NODE_ENV } from "../util/env";

export const javascript = () => {
  const config = {
    input: path.resolve(__dirname, "../../source/scripts/main.js"),
    plugins: [
      resolve({
        browser: true,
        extensions: [".ts", ".mjs", ".js", ".json", ".node"]
      }),
      alias({
        entries: [
          { find: "@", replacement: path.resolve(__dirname, "../../source") },
          { find: "~", replacement: path.resolve(__dirname, "../../source") }
        ]
      }),
      commonjs(),
      replace({ "process.env.NODE_ENV": JSON.stringify(NODE_ENV) }),
      typescript()
    ]
  };

  if (isDevelopment) {
    config.plugins.push(
      terser({
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      })
    );
  }

  return rollup(config)
    .then(bundle => {
      return bundle.write({
        dir: path.resolve(__dirname, "../../dest/assets/javascripts"),
        entryFileNames: "[name].js",
        format: "iife",
        name: "App",
        sourcemap: true
      });
    })
    .catch(err => {
      if (err) logger.error(err);
    });
};
