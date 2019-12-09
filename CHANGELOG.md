# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [9.5.1] - 2019-04-08

Use `npm` in travis config

### Fixed

- Update dependencies and fix vulnerabilities

### Removed

- `babel-core` module

### Changed

- Replace `yarn.lock` with `package-lock.json`
- Replace `change-case` with `lodash`

## [9.5.0] - 2019-04-08

### Added

- `video` component
- Layzyloading script

### Changed

- `progress-bar` style
- `spinner` new styles `pulse` and `square-flip`
- Modules images paths form `images/module-name__image-name.ext` to `images/module-name/image-name.ext`
- Optimizations in `tabs` component
- `label` styles
- Update dependencies

### Removed

- vendor.js

### Fixed

- Delay `notification` can accept `{ delay: 0 }`
- Bug in removeDemo script
- Webmanifest file
- Imagemin config
- Animations `accordion` component

## [9.4.0] - 2019-03-31

### Added

- New components `textfield` and `switch`
- Javascript helpers
- Container component
- EventBus class
- Jest
- Tests for Plugin class, init helper and EventBus class
- New file `_globals.styl` with global includes
- Build `*.pug` files optimizations using custom version on `emitty`
- Supports, retina-query and retina-image mixins to styles core
- social-icons component
- close-button component

### Changed

- `input`, `textarea`, `radio`, `checkbox` components
- Update demo
- `page` and `offcanvas` styles
- Rebuild `page-index` component, has a new name `index` and support nested pages
- Layout component
- Refactored layouts and demo
- Imagemin config
- Extracted javascript core
- Move all files from `source/static` to `source` folder
- Css build proccess config
- Update autoprefixer and postcss config
- New init helper
- Travis config
- Upadte babel to latest version and config
- New ESlint config
- Replace `uglifyjs-webpack-plugin` to `terser-webpack-plugin`

### Fixed

- `typography/base` styles
- Font import from google fonts
- More consitend gulp tasks
- Minor fixes in accordion, alert, browsehappy, dropdown, demo, file, modal, notification, scroll-top, spoiler, star-raiting, tabs, tooltip, polyfils javascript components
- Favicons
- stylus-supermancy config
- fastclick
- sw-precache config now execlude `images/content` folder from cache

### Removed

- Stylelint config
- attr helper
- anime.js
- browsehappy compnent

## [9.3.0] - 2018-07-27

### Added

- TOC in FAQ
- New answers to FAQ
- New component for detection network status

### Fixed

- Script for adding new empty modules
- Bugs in mobile-menu, main-menu

### Changed

- Refactored script for remove demo

## [9.2.1] - 2018-07-09

### Removed

- Greenkeeper

## [9.2.0] - 2018-07-09

### Added

- Plugin base class
- Captcha component

### Changed

- All javascript plugins rewrited using Plugin class
- Updated javascript template for `amo` command
- Updated to new html-like api checkbox, radio, fieldset, form-item, select, textarea, avatar, dialog, modal, spinner, bage, dropdown, accordion components
- Comonent bread-crumbs has new api and new design
- New button style `text`
- New design for card, pagination, accordion, tabs, dialog, spinner, dropdown components
- New modifers and design for table component

### Fixed

- Bug with creating footer in `cleanup` command

## [9.1.0] - 2018-05-02

### Added

- star-rating component
- auto-tab javascript plugin and module
- New plugin for show/hide password button on input[type="password"]
- Add `@` alias for source folder in javascript files
- Advanced loggers for tasks
- Add `omit` and `classnames` libraries to pug locals

### Changed

- Update KEYCODES constatns file
- Rename `dest/precache.js` to `dest/service-worker.js`
- Html-like api for button and input components

### Removed

- `.print-visible` class helper from core styles
- search-widget module

### Fixed

- Bug in script for `amo` command
- Bugs in all javascript plugins

## [9.0.0] - 2018-03-28

### Added

- SVG icons subfolders support
- Precommit hook autoformat for `js, json, jsx, ts, tsx, css, less, scss, stylus, md` files
- New button mixin
- New add modue script and templates from folder
- Add issue and pull request templates
- Vanilla javascript class based plugins

### Changed

- New demo design
- Webpack 4 for javascript building
- Merge `radio-group` and `checkbox-group` modules to `fieldset`

### Removed

- jQuery and all jquery code

## [8.4.0] - 2017-11-22

### Added

- Pug.js layouts.
- `mrmlnc/emitty` support

### Changed

- Update dependencies.
- Update removeDemo script.
- Update pages structure.
- Disable format inside `<script>` in html

### Removed

- injected module.

### Fixed

- Bug in tabs module
