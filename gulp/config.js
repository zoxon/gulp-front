'use strict';

var path = require('path');
var cwd = process.cwd();


module.exports = {
	del: function() {
		return [
			'dest',
			'tmp'
		];
	},

	plumber: function() {
		var errorHandler = require('./util/error-handler.js');

		return {
			errorHandler: errorHandler
		};
	},

	browserSync: function() {
		return {
			server: './dest',
			notify: false,
			reloadOnRestart: true,
			snippetOptions: {
				rule: {
					match: /<\/body>/i
				}
			}
		};
	},

	stylus: function() {
		var rupture = require('rupture');
		var stylusFileExists = require('./util/stylus-file-exists.js');

		return {
			use: [
				rupture(),
				stylusFileExists()
			],
			'include css': true
		};
	},

	include: function() {
		return {
			hardFail: true,
			includePaths: [
				path.join(cwd, '/'),
				path.join(cwd, '/node_modules'),
				path.join(cwd, '/source/static/scripts/plugins')
			]
		};
	},

	pug: function() {
		return {
			pretty: '\t'
		};
	},

	htmlPrettify: function() {
		return {
			'unformatted': [ 'pre', 'code', 'textarea' ],
			'indent_with_tabs': true,
			'preserve_newlines': true,
			'brace_style': 'expand',
			'end_with_newline': true
		};
	},

	svgSymbols: function() {
		return {
			title: false,
			id: '%f',
			className: '%f',
			svgClassname: 'icons-sprite',
			templates: [
				path.join(cwd, 'source/static/styles/templates/icons-template.styl'),
				path.join(cwd, 'source/static/styles/templates/icons-template.svg')
			]
		};
	},

	spritesmith: function() {
		return {
			retinaSrcFilter: '**/*@2x.png',
			imgName: 'sprite.png',
			retinaImgName: 'sprite@2x.png',
			cssName: 'sprite.styl',
			algorithm: 'binary-tree',
			padding: 8,
			cssTemplate: path.join(cwd, 'source/static/styles/templates/sprite-template.mustache')
		};
	},

	imagemin: function() {
		var imagemin = require('gulp-imagemin');
		var imageminPngquant = require('imagemin-pngquant');
		var imageminJpegRecompress = require('imagemin-jpeg-recompress');

		return {
			images: [
				imagemin.gifsicle({
					interlaced: true,
					optimizationLevel: 3
				}),
				imageminJpegRecompress({
					progressive: true,
					max: 80,
					min: 70
				}),
				imageminPngquant({ quality: '75-85' }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: false }
					]
				})
			],

			icons: [
				imagemin.svgo({
					plugins: [
						{ removeTitle: true },
						{ removeStyleElement: true },
						{ removeAttrs: { attrs: [ 'id', 'class', 'data-name', 'fill', 'fill-rule' ] } },
						{ removeEmptyContainers: true },
						{ sortAttrs: true },
						{ removeUselessDefs: true },
						{ removeEmptyText: true },
						{ removeEditorsNSData: true },
						{ removeEmptyAttrs: true },
						{ removeHiddenElems: true },
						{ transformsWithOnePath: true }
					]
				})
			]
		};
	},

	posthtml: function() {
		var posthtmlAttrsSorter = require('posthtml-attrs-sorter');

		return {
			plugins: [
				posthtmlAttrsSorter({
					order: [
						'class',
						'id',
						'name',
						'data',
						'ng',
						'src',
						'for',
						'type',
						'href',
						'values',
						'title',
						'alt',
						'role',
						'aria'
					]
				})
			],
			options: {}
		};
	},

	ghPages: function() {
		return {
			branch: 'build'
		};
	}
};
