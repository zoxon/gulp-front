'use strict';

var errorHandler = require('./util/error-handler.js');
var rupture = require('rupture');
var stylusFileExists = require('./util/stylus-file-exists.js');
var path = require('path');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var posthtmlAttrsSorter = require('posthtml-attrs-sorter');
var autoprefixer = require('autoprefixer');
var perfectionist = require('perfectionist');
var postcssSorting = require('postcss-sorting');
var postcssSortingConfig = require('../.postcss-sorting.json');
var cwd = process.cwd();


module.exports = {
	del: [
		'dest',
		'tmp'
	],

	plumber: {
		errorHandler: errorHandler
	},

	browserSync: {
		server: './dest',
		notify: false,
		reloadOnRestart: true,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		}
	},

	stylus: {
		use: [
			rupture(),
			stylusFileExists()
		],
		'include css': true
	},

	include: {
		hardFail: true,
		includePaths: [
			path.join(cwd, '/'),
			path.join(cwd, '/node_modules'),
			path.join(cwd, '/source/static/scripts/plugins')
		]
	},

	pug: {
		pretty: '\t'
	},

	htmlPrettify: {
		'unformatted': [ 'pre', 'code', 'textarea' ],
		'indent_with_tabs': true,
		'preserve_newlines': true,
		'brace_style': 'expand',
		'end_with_newline': true
	},

	svgSymbols: {
		title: false,
		id: '%f',
		className: '%f',
		svgClassname: 'icons-sprite',
		templates: [
			path.join(cwd, 'source/static/styles/templates/icons-template.styl'),
			path.join(cwd, 'source/static/styles/templates/icons-template.svg')
		]
	},

	spritesmith: {
		retinaSrcFilter: '**/*@2x.png',
		imgName: 'sprite.png',
		retinaImgName: 'sprite@2x.png',
		cssName: 'sprite.styl',
		algorithm: 'binary-tree',
		padding: 8,
		cssTemplate: path.join(cwd, 'source/static/styles/templates/sprite-template.mustache')
	},

	imagemin: {
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
	},

	posthtml: {
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
	},

	postcss: [
		autoprefixer({
			cascade: false
		}),
		perfectionist({
			cascade: false,
			colorCase: 'lower',
			colorShorthand: true,
			format: 'expanded',
			indentChar: '\t',
			indentSize: 1,
			trimLeadingZero: false,
			trimTrailingZeros: true,
			zeroLengthNoUnit: true
		}),
		postcssSorting(postcssSortingConfig)
	],

	ghPages: {
		branch: 'build'
	}
};
