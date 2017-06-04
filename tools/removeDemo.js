// This script removes demo app files
import rimraf from 'rimraf';
import fs from 'fs';
import colors from 'colors';

/* eslint-disable no-console */

const pathsToRemove = [
	'./source/modules/demo',
	'./source/modules/header-presentation',
	'./source/modules/github-button',
	'./source/modules/header/*',
	'./source/modules/logo/logo.js',
	'./source/pages/home.pug',
	'./source/static/assets/favicons/*',
	'./source/static/assets/fonts/*',
	'./source/static/assets/images/content/*',
	'./source/static/assets/icons/*',
	'./source/static/assets/sprite/*',
	'./tools/removeDemo.js' // this file
];

const filesToCreate = [
	{
		path: './source/pages/home.pug',
		content:
`include ../modules/injected/injected
include ../modules/page/page

include ../modules/head/head
include ../modules/footer/footer
include ../modules/header/header

doctype html
html(class="no-js" lang=config.lang)

	head
		+head(head.home)

	+page()
		+inject('header')
			+header()

		+inject('main')
			h1 Home page

		+inject('footer')
			+footer()
`
	},
	{
		path: './source/modules/header/header.pug',
		content:
`mixin header(data)
	header.header&attributes(attributes)
		//-
`
	},
	{
		path: './source/modules/header/header.styl',
		content: '.header\n\t//\n'
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
	const packageJsonPath = './package.json';
	let fileData = fs.readFileSync(packageJsonPath);
	let content = JSON.parse(fileData);
	delete content.scripts[scriptName];
	fs.writeFileSync(packageJsonPath,
	JSON.stringify(content, null, 2) + '\n');
}

let numPathsRemoved = 0;
pathsToRemove.map(path => {
	removePath(path, () => {
		numPathsRemoved++;
		if (numPathsRemoved === pathsToRemove.length) { // All paths have been processed
			// Now we can create files since we're done deleting.
			filesToCreate.map(file => createFile(file));
		}
	});
});

removePackageJsonScriptEntry('remove-demo');

console.log(colors.green('Demo app removed.'));
