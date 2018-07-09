# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
