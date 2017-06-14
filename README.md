# Gulp Front

English description | [Описание на русском](README_RU.md)

*A lean and powerful, gulp-based boilerplate for better front-end coding with [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) and [Stylus](http://stylus-lang.com/)*

[![Build Status](https://travis-ci.org/zoxon/gulp-front.svg?branch=master)](https://travis-ci.org/zoxon/gulp-front/builds)
[![devDependency Status](https://david-dm.org/zoxon/gulp-front/dev-status.svg)](https://david-dm.org/zoxon/gulp-front?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/issues)
[![GitHub forks](https://img.shields.io/github/forks/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/network)
[![GitHub stars](https://img.shields.io/github/stars/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/zoxon/gulp-front/blob/master/LICENSE)
[![Join the chat at https://gitter.im/zoxon/gulp-front](https://img.shields.io/badge/gitter-join%20chat-green.svg?style=flat)](https://gitter.im/zoxon/gulp-front?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Demo
[zoxon.github.io/gulp-front](http://zoxon.github.io/gulp-front/)

## Documentation

[Documentation](docs/README.md)

## Core features

* Modern and fast build tool
* Module based BEM CSS framework
* Automatic icon system based on SVG Symbols
* Easy PNG Sprites generation (including @2x)
* A convenient @media mixins
* Smart image compression

## Quickstart

1. Install the [node.js](https://nodejs.org)
2. Clone the project or [download](https://github.com/zoxon/gulp-front/archive/master.zip) the file
	```sh
	git clone git@github.com:zoxon/gulp-front.git --depth 1 my-project
	```
3. Install `gulp-cli` globally (once!)
	```sh
	npm install gulp-cli -g
	```
4. Install dependencies
	```bash
	npm install
	```
5. Start `gulp`
	```bash
	npm start
	```
6. In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)


## Main tasks

For npm use `npm run <command>`, for Yarn use `yarn <command>`

* `dev` - launches watchers and server
* `build` - compile a project
* `zip` - compile a project in zip
* `deploy` - compile a project and push in `build` branch to git repository
* `remove-demo` - remove demo app

## Module generator

There is a script for add/delete modules in project in gulp-front.

For npm use `npm run <command>`, for Yarn use `yarn <command>`

* `amo <moduleName>` - creates an empty module with a help of technologies, such as pug and styl;
* `amo <moduleName> js yml` - creates an empty module with a help of pug and styl and also using additional technologies: js, yml and json;
* `rmo <moduleName>` - Use to delete a module.

Examples: `npm run amo my-module yml js`, `yarn amo my-other-module`


## Files and folders structure

```
gulp-front/                             # Project root
├── dest                                # Compiled files
├── docs                                # Documentation
├── gulp                                # Gulpfile tasks and config
├── source                              # Source files
│   ├── modules                         # Modules folder
│   ├── pages                           # Pages
│   └── static                          # Static files
│       ├── assets                      # Other files
│       ├── icons                       # SVG icons files
│       ├── public                      # Root files
│       ├── scripts                     # JavaScript files
│       │   ├── helpers                 # JavaScript helpers
│       │   ├── plugins                 # JavaScript plgins and libs
│       │   ├── main.js                 # Main JavaScript file
│       │   └── vendor.js               # Plugins assemblage file
│       └── sprite                      # PNG Sprite files
│       └── styles                      # Static styles
│           ├── components              # Componetns
│           ├── plugins                 # Plugins styles
│           ├── templates               # Sysytem used templates
│           ├── _common.styl            # Different styles
│           ├── _variables.styl         # Variables
│           ├── main.styl               # Main styles
│           └── reset.styl              # Styles reset + typography
├── tmp                                 # Temp folder
├── tools                               # Gulp-front tools
├── zip                                 # Folder with zip archives
├── .babelrc                            # Babel config file
├── .browserslistrc                     # Browserlist config
├── .editorconfig                       # EditorConfig
├── .eslintrc.json                      # ESLint config
├── .gitignore                          # Files ignored by GIT
├── .htmlhintrc                         # Settings for HTMLHint
├── .npmignore                          # Files ignored by npm
├── .postcss-sorting.json               # postcss-sorting config
├── .travis.yml                         # TravisCI config
├── gulpfile.babel.js                   # gulp.js config
├── LICENSE                             # License
├── package.json                        # Dependencies for node.js
├── postcss.config.js                   # PostCSS config
├── README.md                           # English readme file
├── README_RU.md                        # Russian readme file
├── webpack.config.babel.js             # Webpack config
└── yarn.lock                           # YARN Lock file
```

## License
[The MIT License (MIT)](LICENSE)
