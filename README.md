# Gulp Front
** Шаблон для быстрого старта разработки с [Gulp](http://gulpjs.com/), [Jade](http://jade-lang.com/) и [Stylus](https://learnboost.github.io/stylus/)

[![Build Status](https://travis-ci.org/Zoxon/gulp-front.svg)](https://travis-ci.org/Zoxon/gulp-front)
[![Dependency Status](https://david-dm.org/zoxon/gulp-front.svg)](https://david-dm.org/Zoxon/gulp-front)
![GitHub issues](https://img.shields.io/github/issues/Zoxon/gulp-front.svg?style=flat)
![GitHub forks](https://img.shields.io/github/forks/Zoxon/gulp-front.svg?style=flat)
![GitHub stars](https://img.shields.io/github/stars/Zoxon/gulp-front.svg?style=flat)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)



##Быстрый старт

* Установить [node.js](https://nodejs.org)

* Склонировать проект либо [скачать архив](https://github.com/Zoxon/gulp-front/archive/master.zip)

```bash
git clone git@github.com:Zoxon/gulp-front.git my-project && cd my-project
```

Все новые фишки в ветке [develop](https://github.com/Zoxon/gulp-front/tree/develop), но там могут быть баги

* Установить `gulp` глобально (один раз!)

```bash
npm i -g gulp
```

* Установить зависимости (1 раз на проект)

```bash
npm i
```

* Запустить gulp.js

```bash
gulp
```

* В браузере откроется страница с проектом, по адрессу [`http://localhost:3000/`](http://localhost:3000/)

## Структура папок и файлов

```
gulp-front/                        # Корень проекта
├── source                         # Исходные файлы
│   ├── js                         # JavaScript и плагины
│   │   ├── plugins                # Папка с плагинами
│   │   └── plugins.js             # Точка сборки плагинов
│   ├── img                        # Картинки дизайна
│   │   └── content                # Картинки используемые в контенте
│   ├── css                        # Стили
│   │   ├── style.styl             # Основные стили сайта
│   │   ├── reset.styl             # Сбросы и типографика
│   │   ├── formstyler.styl        # Стили для кастомных инпутов
│   │   ├── _variables.styl        # Переменные
│   │   ├── _typography.styl       # Типографика
│   │   ├── _tabs.styl             # Компонент «Табы»
│   │   ├── _slick.styl            # Стили для слайдера slick.js
│   │   ├── _print.styl            # Стили для печати
│   │   ├── _normalize.styl        # normalize.css
│   │   ├── _mixins.styl           # Миксины
│   │   ├── _media.styl            # @meida
│   │   ├── _helpers.styl          # Хелперы
│   │   ├── _grid.styl             # Генератор сеток
│   │   ├── _form.styl             # Стили форм
│   │   ├── _fonts.styl            # Генератор @font-face
│   │   ├── _demo.styl             # Стили для демо
│   │   ├── _debug.styl            # Стили помогающие в отладке
│   │   ├── _components.styl       # Компоненты
│   │   ├── _buttons.styl          # Генератор кнопок
│   │   ├── _animations.styl       # Анимации
│   │   └── _alerts.styl           # Компонент «Алерты»
│   ├── blocks                     # HTML (Jade) части проекта
│   │   ├── _mixins.jade           # Миксины (в основном форм)
│   │   ├── _layout-xhtml.jade     # Лейаут для XHTML
│   │   ├── _layout.jade           # Лейаут для HTML5
│   │   ├── _grid.jade             # Демо сетки
│   │   ├── _demo.jade             # Демо со всеми компонетами и типографикой
│   │   ├── sidebar.jade           # Пример чанка сайдбара
│   │   ├── header.jade            # Пример чанка шапки
│   │   └── footer.jade            # Пример чанка футера
│   ├── index.jade                 # Список HTML файлов проекта
│   └── home.jade                  # Пример страницы
├── public                         # Скомилированные файлы
│   ├── js                         # JavaScript
│   │   ├── script.js              # Копируется из assets/js/script.js
│   │   ├── plugins.min.js         # Собирается из source/js/plugins.js
│   │   └── plugins.js             # Собирается из source/js/plugins.js
│   ├── img                        # Минимизированные картинки из source/img
│   ├── fonts                      # Копируется из assets/fonts
│   ├── css                        # Стили
│   │   ├── style.css              # Собирается из source/css/style.styl
│   │   ├── reset.css              # Собирается из source/css/reset.styl
│   │   └── formstyler.css         # Собирается из source/css/formstyler.styl
│   ├── index.html                 # Собирается из source/index.jade
│   ├── home.html                  # Собирается из source/home.jade
│   ├── favicon.ico                # Копируется из assets
│   └── apple-touch-icon.png       # Копируется из assets
├── psd                            # Для хранения исходных макетов
│   └── assets                     # Файлы появляющеся в процессе работы
│       ├── favicon.psd            # Шаблон фавикон
│       └── apple-touch-icon.psd   # Шаблон фавикон для мобилок
├── assets                         # Файлы которые не нужно обрабатывать
│   ├── js                         # Скирипты
│   │   └── script.js              # Основной файл скриптов
│   ├── img                        # Картинки
│   ├── fonts                      # Шрифты
│   ├── css                        # Стили
│   ├── favicon.ico                # Фавиконки
│   └── apple-touch-icon.png       # Фавиконки
├── README.md                      # Файл который вы читаете
├── package.json                   # Зависимости для node.js
├── LICENSE                        # Лицензия
└── gulpfile.js                    # Конфигурация gulp.js
```

##Лицензия
[The MIT license](LICENSE)
