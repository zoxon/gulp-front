import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import { kebabCase, camelCase, upperCase, upperFirst, snakeCase } from "lodash";
import colors from "colors";

// Settings
const TEMPLATES_DIR = path.join(process.cwd(), "tools/_templates");
const MODULES_DIR = path.join(process.cwd(), "source/modules");
const DEFAULT_EXTENSIONS = ["pug", "styl"];

// Utils
/* eslint-disable no-console */
function showError(title, error) {
  const errorTitle = colors.red(`[${title.toUpperCase()}]`);
  return console.error(`${errorTitle}:\n ${error}`);
}

function showMessage(title, message) {
  const messageTitle = colors.green(`[${title.toUpperCase()}]`);
  return console.log(`${messageTitle}: ${message}`);
}
/* eslint-enable no-console */

function uniqueArray(array) {
  const object = {};

  for (const string of array) {
    object[string] = true;
  }

  return Object.keys(object);
}

function createFile(path, content) {
  try {
    fs.writeFileSync(path, content, "utf8");
    showMessage("File created", path);
  } catch (error) {
    showError("File not created", error);
  }
}

// Read arguments
const blockName = kebabCase(process.argv[2]);
const extensions = uniqueArray(
  DEFAULT_EXTENSIONS.concat(process.argv.slice(3) || [])
);

if (blockName) {
  const directoryPath = path.join(MODULES_DIR, blockName);

  // создаем
  mkdirp(directoryPath, function (error) {
    if (error) {
      showError("CANCELED", error);
    } else {
      showMessage("CREATE FOLDER", directoryPath);

      extensions.forEach((extension) => {
        const templateFilePath = path.join(
          TEMPLATES_DIR,
          `_template.${extension}`
        );

        // get stats about the current file
        const templateFileStats = fs.statSync(templateFilePath);

        if (templateFileStats.isFile()) {
          const template = fs.readFileSync(templateFilePath, "utf8") || "";

          const targetFilePath = path.join(
            MODULES_DIR,
            blockName,
            `${blockName}.${extension}`
          );

          let targetContent = template;

          [
            { method: "paramCase", fn: (string) => kebabCase(string) },
            { method: "camelCase", fn: (string) => camelCase(string) },
            { method: "upperCase", fn: (string) => upperCase(string) },
            {
              method: "pascalCase",
              fn: (string) => upperFirst(camelCase(string)),
            },
            { method: "snakeCase", fn: (string) => snakeCase(string) },
          ].forEach((util) => {
            targetContent = targetContent.replace(
              new RegExp(`#{blockname.${util.method}}`, "g"),
              util.fn(blockName)
            );
          });

          if (fs.existsSync(targetFilePath)) {
            showError("File not created", targetFilePath + " (уже существует)");
          } else {
            createFile(targetFilePath, targetContent);
          }
        }
      });
    }
  });
} else {
  showError("Canceled", "block name not set");
}
