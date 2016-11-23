# Gulp Front

English description | [Описание на русском](README_RU.md)

*A lean and powerful, gulp-based boilerplate for better front-end coding with [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) and [Stylus](https://learnboost.github.io/stylus/)*

[![Build Status](https://api.travis-ci.org/zoxon/gulp-front.svg)](https://travis-ci.org/zoxon/gulp-front)
[![devDependency Status](https://david-dm.org/zoxon/gulp-front/dev-status.svg)](https://david-dm.org/zoxon/gulp-front#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/issues)
[![GitHub forks](https://img.shields.io/github/forks/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/network)
[![GitHub stars](https://img.shields.io/github/stars/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/zoxon/gulp-front/blob/master/LICENSE)
[![Join the chat at https://gitter.im/zoxon/gulp-front](https://img.shields.io/badge/gitter-join%20chat-green.svg?style=flat)](https://gitter.im/zoxon/gulp-front?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Demo
[zoxon.github.io/gulp-front](http://zoxon.github.io/gulp-front/)

## Benefits & Features

* Fast and easy collector (gulp)
* Simplest modules realization (js, styl, pug, json and other files) 
* Base modules (bread-crumbs, button, footer, form, form-item, header, input-group, logo, main-menu, page-title, pagination and etc.) 
* Build of svg sprites for inline connection (gulp-svg-symbols) 
* Build of png and retina sprites (gulp-spritesmith)
* Pug mixins for @media (rupture)
* Merging @media and transfer it to the end of the file (css-mqpacker)
* Server and synchronous site testing in the browser (using the browser-sync)
* Autosubstitution of vendor prefixes in CSS (autoprefixer)
* Pug template and HTML preprocessor (gulp-pug)
* JavaScript files concatenation (gulp-include)
* CSS formatting (gulp-csscomb)
* Image compression (gulp-imagemin)
* CSS preprocessor (gulp-stylus)
* CSS minification (gulp-csso)
* HTML formatting (gulp-htmlprettify)
* JavaScript Minification (gulp-uglify)
* Errors searching and output without stopping gulp (gulp-plumber)
* Pug mixins for form elements
* Customized typography based on normalize.css
* Mixins for grid (fluid and fixed)
* Mixins for font-face and others.
* Customized configs for Travis CI and EditorConfig
* Compiled files package in zip


## Quick start

* Install the [node.js](https://nodejs.org)
* Clone the project or [download](https://github.com/zoxon/gulp-front/archive/master.zip) the file

	```bash
	git clone git@github.com:zoxon/gulp-front.git my-project && cd my-project
	```

* For [Yarn](https://yarnpkg.com)
	- Install `gulp` globally (once!)

		```bash
		yarn global add gulp
		```

	- Install dependencies

		```bash
		yarn
		```

* For [NPM](https://www.npmjs.com)
	- Update npm to latest version
		Go to the folder with installed nodejs

		```bash
		cd "C:\Program Files\nodejs"
		```

		or

		```bash
		cd "C:\Program Files (x86)\nodejs"
		```

		and execute

		```bash
		npm install npm@latest
		```

	- Install `gulp` globally (once!)

		```bash
		npm install gulp -g
		```

	- Install dependencies

		```bash
		npm install
		```

* Start `gulp`

	```bash
	gulp dev
	```

* In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)


## Main tasks

* `gulp dev` - launches watchers and server
* `gulp build` - compile a project
* `gulp zip` - compile a project in zip
* `gulp deploy` - compile a project and push in `build` branch to git repository

## Module generation

There is a script for add/delete modules in project in gulp-front.

* `npm run amo <moduleName>` - creates an empty module with a help of technologies, such as pug and styl;
* `npm run amo <moduleName> js yml` - creates an empty module with a help of pug and styl and also using additional technologies: js, yml and json;
* `npm run rmo <moduleName>` - Use to delete a module completely;
* `npm run rmo <moduleName>` - Use to delete a module.


## Files and folders structure

```
gulp-front/                             # Project root
├── dest                                # Compiled files
├── source                              # Source files
│   ├── modules                         # Modules folder
│   ├── pages                           # Pages
│   └── static                          # Static files
│       ├── assets                      # Other files
│       ├── scripts                     # JavaScript files
│       │   ├── plugins                 # JavaScript plgins and libs
│       │   ├── main.js                 # Main JavaScript file
│       │   └── plugins.js              # Plugins assemblage file
│       └── styles                      # Static styles
│           ├── components              # Componetns
│           ├── plugins                 # Plugins styles
│           ├── _common.styl            # Different styles
│           ├── _media.styl             # @media
│           ├── _variables.styl         # Variables
│           ├── main.styl               # Main styles
│           └── reset.styl              # Styles reset + typography
├── tmp                                 # Temp folder
├── zip                                 # Folder with zip archives
├── package.json                        # Dependencies for node.js
├── .csscomb.json                       # csscomb config
├── .editorconfig                       # EditorConfig
├── .travis.yml                         # TravisCI config
├── gulpfile.js                         # gulp.js config
├── LICENSE                             # License
└── README.md                           # File you read
```

## License
[The MIT License (MIT)](LICENSE)
