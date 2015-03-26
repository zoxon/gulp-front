# Gulp Front

[![Build Status](https://travis-ci.org/Zoxon/gulp-front.svg)](https://travis-ci.org/Zoxon/gulp-front)
[![Dependency Status](https://david-dm.org/zoxon/gulp-front.svg)](https://david-dm.org/Zoxon/gulp-front)
![Github branch](https://img.shields.io/badge/branch-develop-red.svg?style=flat)
![GitHub issues](https://img.shields.io/github/issues/Zoxon/gulp-front.svg?style=flat)
![GitHub forks](https://img.shields.io/github/forks/Zoxon/gulp-front.svg?style=flat)
![GitHub stars](https://img.shields.io/github/stars/Zoxon/gulp-front.svg?style=flat)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Простой путь разработки с Jade и Stylus



##Структура проекта

* assets — Содержимое копируется в папку *public*. Здесь хранятся статичные файлы.
* psd — Предназначена для хранения макетов дизайна.
* public — Корень сервера. Все сгенерированные файлы складываются сюда.
* source — Исходный код для препроцессоров.
* source
	* blocks — Миксины и чанки jade
	* css — Stylus файлы
	* img — Картинки. Обрабатываются imgaemin
	* js/plugins — JQuery плагины
	* js/plugins.js — Точка сборки плагинов



##Установка

1. Нужно установить gulp глобально один раз
	```
	npm install -g gulp
	```
2. Перейти в папку проекта
	```
	cd gulp-front
	```
3. Установить зависимости
	```
	npm install
	```


##Запуск

1. Перейти в папку проекта
	```
	cd gulp-front
	```
2. Запуситить таск менеджер
	```
	gulp
	```
3. Открыть в браузере
	Cервер запустится на [http://localhost:3000/](http://localhost:3000/)


##Лицензия
[The MIT license](LICENSE)
