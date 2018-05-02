import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import changeCase from "change-case";

// Settings
const TEMPLATES_DIR = path.join(process.cwd(), "tools/_templates");
const MODULES_DIR = path.join(process.cwd(), "source/modules");
const DEFAULT_EXTENSIONS = ["pug", "styl"];

// Utils
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
    console.log("Файл создан: " + path);
  } catch (error) {
    return console.log("Файл НЕ создан: " + error);
  }
}

// Read arguments
const blockName = changeCase.paramCase(process.argv[2]);
let extensions = uniqueArray(
  DEFAULT_EXTENSIONS.concat(process.argv.slice(3) || [])
);

if (blockName) {
  let dirPath = path.join(MODULES_DIR, blockName);

  // создаем
  mkdirp(dirPath, function(err) {
    if (err) {
      console.error("Отмена операции: ", err);
    } else {
      console.log(
        `Создание папки ${dirPath} (создана, если ещё не существует)`
      );

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

          let targetContent = template.replace(
            /#{blockname.dashCase}/g,
            changeCase.paramCase(blockName)
          );
          targetContent = targetContent.replace(
            /#{blockname.pascalCase}/g,
            changeCase.pascalCase(blockName)
          );

          if (fs.existsSync(targetFilePath)) {
            console.log(
              "Файл НЕ создан: " + targetFilePath + " (уже существует)"
            );
          } else {
            createFile(targetFilePath, targetContent);
          }
        }
      });
    }
  });
} else {
  console.log("Отмена операции: не указан блок");
}
