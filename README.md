# Gulp Front

_A lean and powerful, gulp-based boilerplate for better front-end coding with [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) and [Stylus](http://stylus-lang.com/)_

[![Build Status](https://travis-ci.org/zoxon/gulp-front.svg?branch=master)](https://travis-ci.org/zoxon/gulp-front/builds)
[![GitHub issues](https://img.shields.io/github/issues/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/issues)
[![GitHub forks](https://img.shields.io/github/forks/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/network)
[![GitHub stars](https://img.shields.io/github/stars/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/zoxon/gulp-front/blob/master/LICENSE)
[![Join the chat at https://t.me/gulpfront](https://img.shields.io/badge/Telegram-join%20chat-0088cc.svg?style=flat)](https://t.me/gulpfront)
[![Join the chat at https://gitter.im/zoxon/gulp-front](https://img.shields.io/badge/gitter-join%20chat-green.svg?style=flat)](https://gitter.im/zoxon/gulp-front?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Demo

[zoxon.github.io/gulp-front](http://zoxon.github.io/gulp-front/)

## Documentation

More information see in [docs](docs/README.md) folder

## Core features

- Modern and fast build tool
- Module based BEM CSS framework
- Automatic icon system based on SVG Symbols
- Easy PNG Sprites generation (including @2x)
- A convenient @media mixins
- Smart image compression

## Quickstart

1.  Install the [node.js](https://nodejs.org)
2.  Clone the project or [download](https://github.com/zoxon/gulp-front/archive/master.zip) the file
    ```sh
    git clone git@github.com:zoxon/gulp-front.git --depth 1 my-project
    ```
3.  Go to project folder and run
    ```bash
    npm run setup
    ```
4.  Start dev server
    ```bash
    npm start
    ```
5.  In browser open page with address [`http://localhost:3000/`](http://localhost:3000/)

## Main tasks

- `npm run dev` - launches watchers and server
- `npm run build` - compile a project
- `npm run zip` - compile a project in zip
- `npm run deploy` - compile a project and push in `build` branch to git repository
- `npm run cleanup` - remove demo app

## Module generator

Create empty module by name in `source/modules` folder

By default generate only `*.pug` and `*.styl` files.

You can call `amo` with additional params like `js` and `yml`

```sh
npm run amo <module-name> [js || yml]
```

## License

[The MIT License (MIT)](LICENSE)
