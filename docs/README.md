# Documentation

## Table of Contents

- [Documentation](#documentation)
  - [Table of Contents](#table-of-contents)
  - [Quickstart](#quickstart)
  - [Development](#development)
  - [Building and Deploying](#building-and-deploying)
  - [Structure](#structure)
  - [CSS](#css)
  - [HTML](#html)
  - [JavaScript](#javascript)
  - [PNG Sprites](#png-sprites)
  - [SVG Symbol Sprites](#svg-symbol-sprites)
  - [DATA](#data)
  - [Command Line Commands](#command-line-commands)
    - [Initialization](#initialization)
    - [Development](#development)
    - [Cleaning](#cleaning)
    - [Building](#building)
    - [Deploying](#deploying)
    - [Zip](#zip)
    - [Generator](#generator)
  - [License](#license)

<a name="quickstart"></a>

## Quickstart

1.  Install the [node.js](https://nodejs.org)
2.  Clone the project or [download](https://github.com/zoxon/gulp-front/archive/master.zip) the file
    ```sh
    git clone git@github.com:zoxon/gulp-front.git --depth 1 my-project
    ```
3.  Go to project folder and run
    ```sh
    npm run setup
    ```
4.  Start dev server
    ```sh
    npm start
    ```
5.  In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)

<a name="development"></a>

## Development

1.  Run `npm run cleanup`. This command delete demo app.
2.  Run `npm start` to see your app at [`http://localhost:3000/`](http://localhost:3000/)

<a name="building-and-deploying"></a>

## Building and Deploying

1.  Run `npm run build`, which will compile all the necessary files to the `dest` folder.
2.  Upload the contents of the `dest` folder to your web server's root folder.

<a name="structure"></a>

## Structure

The `source` directory contains your entire application code, including CSS, JavaScript, HTML.

The rest of the folders and files only exist to make your life easier, and should not need to be touched.

Below you can find full details about significant files and folders.

```
gulp-front/                         # Project root
├── dest                            # Compiled files
├── docs                            # Documentation
├── gulp                            # Gulpfile tasks and config
├── source
│   ├── icons                       # SVG icons sprite files
│   ├── layouts                     # Pug layouts
│   ├── modules                     # Modules folder
│   ├── pages                       # Pages
│   ├── public                      # Static files copy to project root
│   ├── scripts
│   │   ├── core                    # JS Modules core
│   │   ├── helpers                 # JS various helpers
│   │   └── main.js                 # Main JavaScript file
│   ├── sprite                      # PNG Sprite files
│   └── styles
│       ├── core
│       │   ├── helpers             # System level helper classes
│       │   ├── mixins              # System mixins
│       │   ├── typography          # Typography styles
│       │   └── variables           # System variables
│       ├── _common.styl            # Different styles
│       ├── _variables.styl         # Variables
│       ├── main.styl               # Main styles
│       └── reset.styl              # Styles reset + typography
├── tmp                             # Temp folder
├── tools                           # Gulp-front tools
└── zip                             # Folder with buld zip archives
```

<a name="css"></a>

## CSS

- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Stylus](http://stylus-lang.com/)
  - [rupture](https://github.com/jescalan/rupture) - Simple media queries mixins for stylus - npm css files import with [stylus include feature](https://github.com/jescalan/accord/blob/master/docs/stylus.md#include)
- [PostCSS](http://postcss.org/)
  - [autoprefixer](https://github.com/postcss/autoprefixer) - Parse CSS and add vendor prefixes to rules by Can I Use
  - [perfectionist](https://github.com/ben-eb/perfectionist) - Beautify CSS files
  - [postcss-sorting](https://github.com/hudochenkov/postcss-sorting) - Keep rules and at-rules content in order
  - [postcss-reporter](https://github.com/postcss/postcss-reporter) - Log PostCSS messages in the console

<a name="html"></a>

## HTML

- [Pug (ex Jade)](https://pugjs.org/) - Robust, elegant, feature rich template engine
- [PostHTML](https://github.com/posthtml/posthtml) - Tool to transform HTML/XML with JS plugins
- [gulp-prettify](https://github.com/jonschlinkert/gulp-prettify) - `js-beautify` gulp wrapper

<a name="javascript"></a>

## JavaScript

- Tools
  - [Node.js](https://nodejs.org/) - JavaScript runtime
  - [Webpack 4](https://webpack.js.org/) - module bundler
  - [npm](https://www.npmjs.com/) - package manager
  - [Yarn](https://yarnpkg.com/lang/en/) - package manager
  - [ECMAScript 6](http://es6-features.org/) and [Babel](https://babeljs.io/)
  - [Service Worker Precache](https://github.com/GoogleChromeLabs/sw-precache) - service worker that precaches resources
- Libraries
  - [FastClick](https://github.com/ftlabs/fastclick) - remove 300ms delay on mobile browsers
  - [js-cookie](https://github.com/js-cookie/js-cookie) - JavaScript API for handling cookies
  - [Micromodal](https://github.com/ghosh/micromodal) - accessible modal dialogs
  - [Nano ID](https://github.com/ai/nanoid) - unique string ID generator
  - [scroll](https://github.com/michaelrhodes/scroll) - animates an element’s scrollTop or scrollLeft position
  - [lodash](https://lodash.com/) - utility library delivering modularity, performance & extras
  - [Tooltip.js](https://github.com/FezVrasta/popper.js) - dead simple tooltips, powered by popper.js
  - [attrs](https://github.com/bredele/attrs) - Object as DOM attributes.
  - [Classnames](https://github.com/JedWatson/classnames) - A simple javascript utility for conditionally joining classNames together
  - [omit](https://github.com/DamonOehlman/omit) - Remove values from an object (or an array of objects) based on key, value or an evaluator function
  - [ScrollReveal](https://github.com/scrollreveal/scrollreveal) - Animate elements as they scroll into view
  - [skrollr](https://github.com/Prinzhorn/skrollr) - Stand-alone parallax scrolling JavaScript library for mobile and desktop
  - [slide-anim](https://github.com/yomotsu/slide-anim) - Light weight, stand alone, jQuery like slideDown / slideUp
- Polyfills
  - [svg4everybody](https://github.com/jonathantneal/svg4everybody) - adds SVG External Content support to all browsers.
  - [promise](https://github.com/then/promise)
  - [raf](https://github.com/chrisdickinson/raf) - equestAnimationFrame polyfill
  - [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)
  - [whatwg-fetch](https://github.com/github/fetch) - Fetch API polyfill
  - [element-closest](https://github.com/jonathantneal/closest) - Element.closest and Element.matches polyfills

<a name="png-sprites"></a>

## PNG Sprites

For converting a set of images into a spritesheet add your image to `source/sprite` folder.
Spritesheet generates with the help of [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)
Retina spritesheets/templates are supported too.

<a name="svg-symbol-sprites"></a>

## SVG Symbol Sprites

To convert a bunch of svg files to a single svg sprite add svg file to `source/icons` folder.
Then you can use icon mixin call in your template.

Example:

1.  You copy file icon-name.svg to `source/icons` folder.
2.  In any _pug_ template, import icon mixin `include ../icon/icon`
3.  Use `+icon(name="icon-name" title="Icon title")` to render icon

Spritesheet generates with plugin [gulp-svg-symbols](https://github.com/Hiswe/gulp-svg-symbols)

<a name="data"></a>

## DATA

All data in modules stores in `data/*.yaml` files

[YAML](http://yaml.org/) Ain't Markup Language

<a name="command-line-commands"></a>

## Command Line Commands

<a name="initialization"></a>

### Initialization

```sh
npm install
```

<a name="development"></a>

### Development

Starts the development server running on http://localhost:3000

```sh
npm start
```

<a name="cleaning"></a>

### Cleaning

Remove demo app.

```sh
npm run cleanup
```

<a name="building"></a>

### Building

Build project.

```sh
npm run build
```

<a name="deploying"></a>

### Deploying

Create `build` branch in your git repository and push compilled files.

```sh
npm run deploy
```

<a name="zip"></a>

### Zip

Build a project and pack content of `dest` folder in zip file

```sh
npm run zip
```

<a name="module-generator"></a>

### Generator

Create empty module by name in `source/modules` folder

By default generate only `*.pug` and `*.styl` files.

You can call `amo` (**A**dd **Mo**dule) with additional params like `js` and `yml`

```sh
npm run amo <module-name> [js || yml]
```

<a name="license"></a>

## License

[The MIT License (MIT)](../LICENSE)
