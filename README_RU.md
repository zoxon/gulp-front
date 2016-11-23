# Gulp Front

[English description](README.md) | Описание на русском

*Шаблон для быстрого старта разработки с [Gulp](http://gulpjs.com/), [Pug](https://pugjs.org/) и [Stylus](https://learnboost.github.io/stylus/)*

[![Build Status](https://api.travis-ci.org/zoxon/gulp-front.svg)](https://travis-ci.org/zoxon/gulp-front)
[![devDependency Status](https://david-dm.org/zoxon/gulp-front/dev-status.svg)](https://david-dm.org/zoxon/gulp-front#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/issues)
[![GitHub forks](https://img.shields.io/github/forks/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/network)
[![GitHub stars](https://img.shields.io/github/stars/zoxon/gulp-front.svg?style=flat)](https://github.com/zoxon/gulp-front/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/zoxon/gulp-front/blob/master/LICENSE)
[![Join the chat at https://gitter.im/zoxon/gulp-front](https://img.shields.io/badge/gitter-join%20chat-green.svg?style=flat)](https://gitter.im/zoxon/gulp-front?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Демо
[zoxon.github.io/gulp-front](http://zoxon.github.io/gulp-front/)

## Преимущества и возможности

* Быстрый и удобный сборщик (gulp)
* Простейшие модули (js, styl, pug, json, прочие файлы)
* Базовые модули (bread-crumbs, button, footer, form, form-item, header, input-group, logo, main-menu, page-title, pagination и др.)
* Сборка svg спрайтов для инлайн подлючения (gulp-svg-symbols)
* Сборка png спрайтов и ретина спрайтов (gulp-spritesmith)
* Pug миксины для @media (rupture)
* Склейка @media и перенос в конец файла (css-mqpacker)
* Сервер и синхронное тестирование сайта в браузерах (с помощью browser-sync)
* Авто-подстановка вендорных префиксов в CSS (autoprefixer)
* Шаблонизатор Pug и препроцессор HTML (gulp-pug)
* Конкатенация JavaScript файлов (gulp-include)
* Форматирование CSS (gulp-csscomb)
* Сжатие изображений (gulp-imagemin)
* Препроцессор CSS (gulp-stylus)
* Минификация CSS (gulp-csso)
* Форматирование HTML (gulp-html-prettify)
* Минификация JavaScript (gulp-uglify)
* Перехват и вывод ошибок без остановки gulp (gulp-plumber)
* Pug миксины для елементов форм
* Настроенная типографика на базе normalize.css
* Миксины сетки (fluid и fixed)
* Миксины для font-face и др.
* Настроенные конфиги для TravisCI и EditorConfig
* Упаковка скомпилированных файлов в zip архив


## Быстрый старт

* Установить [node.js](https://nodejs.org)
* Склонировать проект либо [скачать архив](https://github.com/zoxon/gulp-front/archive/master.zip)

	```bash
	git clone git@github.com:zoxon/gulp-front.git my-project && cd my-project
	```

* Для [Yarn](https://yarnpkg.com)
	- Установить `gulp` глобально (один раз!)

		```bash
		yarn global add gulp
		```

	- Установить зависимости (1 раз на проект)

		```bash
		yarn
		```

* Для [NPM](https://www.npmjs.com)
	- Обновите npm до последней версии
		Зайти в папку с установленной nodejs

		```bash
		cd "C:\Program Files\nodejs"
		```

		или

		```bash
		cd "C:\Program Files (x86)\nodejs"
		```

		в зависимости от того где у вас установленна nodejs, и выполнить

		```bash
		npm install npm@latest
		```

	- Установить `gulp` глобально (один раз!)

		```bash
		npm install gulp -g
		```

	- Установить зависимости (1 раз на проект)

		```bash
		npm install
		```

* Запустить `gulp`

	```bash
	gulp dev
	```

* В браузере откроется страница с проектом, по адрессу [`http://localhost:3000/`](http://localhost:3000/)


## Основные таски

* `gulp dev` - запускает вотчеры и сервер
* `gulp build` - собирает проект
* `gulp zip` - собирает проект и архивирует его в zip архив
* `gulp deploy` - собирает проект и шлет в ветку `build` (только для Git)

## Генерация модулей

В gulp-front имеется удобный скритп для добавления/удаления модулей в проект.

* `npm run amo <moduleName>` - создает пустой модуль из двух технологий pug и styl
* `npm run amo <moduleName> js yml` - создает пустой модуль из двух технологий pug и styl и дополнительных технологий js yml
* `npm run rmo <moduleName>` - удаляет модуль

## Структура папок и файлов

```
gulp-front/                             # Корень проекта
├── dest                                # Скомилированные файлы
├── source                              # Исходные файлы
│   ├── modules                         # Простейшие модули
│   ├── pages                           # Страницы
│   └── static                          # Статичные файлы
│       ├── assets                      # Прочие файлы
│       ├── scripts                     # JavaScript файлы
│       │   ├── plugins                 # Папка с плагинами
│       │   ├── main.js                 # Основной js файл
│       │   └── plugins.js              # Точка сборки плагинов
│       └── styles                      # Статичные стили
│           ├── components              # Компоненты
│           ├── plugins                 # Стили плагинов
│           ├── _common.styl            # Различные стили
│           ├── _media.styl             # @media
│           ├── _variables.styl         # Переменные
│           ├── main.styl               # Основной файл стилей
│           └── reset.styl              # Сброс стилей + типографика
├── tmp                                 # Временная папка
├── zip                                 # Папка с zip архивами
├── package.json                        # Зависимости для node.js
├── .csscomb.json                       # Конфиг для csscomb
├── .editorconfig                       # Конфиг для EditorConfig
├── .travis.yml                         # Конфиг для TravisCI
├── gulpfile.js                         # Конфиг gulp.js
├── LICENSE                             # Лицензия
└── README.md                           # Файл который вы читаете
```

## Лицензия
[The MIT License (MIT)](LICENSE)
