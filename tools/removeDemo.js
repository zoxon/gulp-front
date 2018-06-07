// This script removes demo app files
import rimraf from "rimraf";
import fs from "fs";
import colors from "colors";

/* eslint-disable no-console */

const pathsToRemove = [
  "./source/modules/demo",
  "./source/modules/header-presentation",
  "./source/modules/header/*",
  "./source/modules/footer/*",
  "./source/pages/index.pug",
  "./source/pages/buttons.pug",
  "./source/pages/components.pug",
  "./source/pages/forms.pug",
  "./source/pages/typography.pug",
  "./source/pages/docs.pug",
  "./source/pages/faq.pug",
  "./source/static/assets/favicons/*",
  "./source/static/assets/fonts/*",
  "./source/static/assets/images/content/*",
  "./source/static/assets/icons/*",
  "./source/static/assets/sprite/*",
  "./tools/removeDemo.js" // this file
];

const filesToCreate = [
  {
    path: "./source/pages/home.pug",
    content: `extends ../layouts/default
include ../modules/footer/footer
include ../modules/header/header


block head
	- title = "Home page"

block header
	+header()

block main
	h1 Home page

block footer
	+footer()
`
  },
  {
    path: "./source/modules/header/header.pug",
    content: `mixin header(data)
	header.header&attributes(attributes)
		//-
`
  },
  {
    path: "./source/modules/header/header.styl",
    content: ".header\n\t//\n"
  },
  {
    path: "./source/pages/index.pug",
    content: `extends ../layouts/default

include ../modules/_page-list/_page-list

block head
	- title = "Pages list"

	style
		:stylus
			@import "../static/styles/core/variables.styl"
			@import "../static/styles/_variables.styl"
			@import "../static/styles/core/mixins.styl"
			@import "../static/styles/_mixins.styl"
			@import "../modules/_page-list/_page-list.styl"

block page
	+page-list(pageList.data)
`
  },
  {
    path: "./source/modules/footer/footer.pug",
    content: `mixin footer(data)
	footer.footer&attributes(attributes)
		p &copy; You copyright
`
  },
  {
    path: "./source/modules/footer/footer.styl",
    content: `mixin footer(data)
	.footer
		//
`
  }
];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
  });
}

function createFile(file) {
  fs.writeFile(file.path, file.content, error => {
    if (error) throw new Error(error);
  });
}

function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = "./package.json";
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + "\n");
}

let numPathsRemoved = 0;
pathsToRemove.map(path => {
  removePath(path, () => {
    numPathsRemoved++;
    if (numPathsRemoved === pathsToRemove.length) {
      // All paths have been processed
      // Now we can create files since we're done deleting.
      filesToCreate.map(file => createFile(file));
    }
  });
});

removePackageJsonScriptEntry("remove-demo");

console.log(colors.green("Demo app removed."));
