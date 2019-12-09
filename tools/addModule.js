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
function showError(title, err) {
  const errTitle = colors.red(`[${title.toUpperCase()}]`);
  return console.error(`${errTitle}:\n ${err}`);
}

function showMessage(title, message) {
  const messageTitle = colors.green(`[${title.toUpperCase()}]`);
  return console.log(`${messageTitle}: ${message}`);
}
/* eslint-enable no-console */

function uniqueArray(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    obj[str] = true;
  }

  return Object.keys(obj);
}

function createFile(path, content) {
  try {
    fs.writeFileSync(path, content, "utf8");
    showMessage("File created", path);
  } catch (err) {
    showError("File not created", err);
  }
}

// Read arguments
const blockName = kebabCase(process.argv[2]);
let extensions = uniqueArray(
  DEFAULT_EXTENSIONS.concat(process.argv.slice(3) || [])
);

if (blockName) {
  let dirPath = path.join(MODULES_DIR, blockName);

  // создаем
  mkdirp(dirPath, function(err) {
    if (err) {
      showError("CANCELED", err);
    } else {
      showMessage("CREATE FOLDER", dirPath);

      extensions.forEach(extension => {
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
            { method: "paramCase", fn: str => kebabCase(str) },
            { method: "camelCase", fn: str => camelCase(str) },
            { method: "upperCase", fn: str => upperCase(str) },
            { method: "pascalCase", fn: str => upperFirst(camelCase(str)) },
            { method: "snakeCase", fn: str => snakeCase(str) }
          ].forEach(util => {
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
