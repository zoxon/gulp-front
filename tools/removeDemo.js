// This script removes demo app files
import fse from "fs-extra";
import path from "path";
import colors from "colors";
import glob from "glob";

const TEMPLATE_FOLDER = path.resolve(__dirname, "./removeDemo/replace");
const DEST_FOLDER = path.resolve(__dirname, "../source");
const PACKAGE_JSON = path.resolve(__dirname, "../package.json");
const PATHS_TO_REMOVE = [
  // pages and layouts
  "./source/pages/*",
  "./source/layouts/home.pug",

  // modules
  "./source/modules/demo",
  "./source/modules/header-presentation",
  "./source/modules/header",
  "./source/modules/footer",
  "./source/modules/features-list",
  "./source/modules/features-list-item",
  "./source/modules/main-page",
  "./source/modules/quick-start",

  // static files
  "./source/icons/*",
  "./source/sprite/*",
  "./source/assets/favicons/*",
  "./source/assets/fonts/*",
  "./source/assets/images/*",
  "./source/assets/images/content/*",

  // this file
  "./tools/removeDemo.js"
];

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

function removeFilesGlob(pathGlob, options = { messages: true }) {
  return glob(pathGlob, {}, (err, matches) => {
    if (err) showError("Error", err);

    return matches.map(matchedFile => {
      if (options.messages) {
        showMessage("Remove file", matchedFile);
      }
      return fse.remove(matchedFile);
    });
  });
}

function copyFiles(pathFrom, pathTo, options = { messages: true }) {
  return fse.copy(pathFrom, pathTo).then(err => {
    if (err) return showError("Error", err);

    if (options.messages) {
      showMessage("Copy file", `${pathFrom} -> ${pathTo}`);
    }
  });
}

// Remove entry from package.json
const removeEntryFromPackageJson = key =>
  fse
    .readJson(PACKAGE_JSON)
    .then(pkg => {
      delete pkg.scripts[key];
      return fse.writeJson(PACKAGE_JSON, pkg, {
        spaces: 2,
        EOL: "\n"
      });
    })
    .catch(err => showError("Error", err));

Promise.all(PATHS_TO_REMOVE.map(path => removeFilesGlob(path)))
  .then(() => copyFiles(TEMPLATE_FOLDER, DEST_FOLDER))
  .then(() => removeFilesGlob(TEMPLATE_FOLDER))
  .then(() => removeEntryFromPackageJson("cleanup"))
  .then(() => console.log(colors.green("Demo app removed."))) // eslint-disable-line no-console
  .catch(err => showError("Error", err));
