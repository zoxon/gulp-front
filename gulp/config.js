import path from 'path';
const CWD = process.cwd();
import gulpImagemin from 'gulp-imagemin';

export const delConfig = [
	'dest',
	'tmp'
];

export const plumberConfig = {
	errorHandler: require('./util/errorHandler.js')
};

export const browserSyncConfig = {
	server: './dest',
	notify: false,
	reloadOnRestart: true,
	snippetOptions: {
		rule: {
			match: /<\/body>/i
		}
	}
};

export const stylusConfig = {
	use: [
		require('rupture')(),
		require('./util/stylusFileExists')()
	],
	'include css': true
};

export const pugConfig = {
	pretty: '\t'
};

export const htmlPrettifyConfig = {
	'unformatted': [ 'pre', 'code', 'textarea' ],
	'indent_with_tabs': true,
	'preserve_newlines': true,
	'brace_style': 'expand',
	'end_with_newline': true
};

export const svgSymbolsConfig =  {
	title: false,
	id: '%f',
	className: '%f',
	svgClassname: 'icons-sprite',
	templates: [
		path.join(CWD, 'source/static/styles/templates/icons-template.styl'),
		path.join(CWD, 'source/static/styles/templates/icons-template.svg')
	]
};

export const spritesmithConfig = {
	retinaSrcFilter: '**/*@2x.png',
	imgName: 'sprite.png',
	retinaImgName: 'sprite@2x.png',
	cssName: 'sprite.styl',
	algorithm: 'binary-tree',
	padding: 8,
	cssTemplate: path.join(CWD, 'source/static/styles/templates/sprite-template.mustache')
};

export const imageminConfig = {
	images: [
		gulpImagemin.gifsicle({
			interlaced: true,
			optimizationLevel: 3
		}),
		require('imagemin-jpeg-recompress')({
			progressive: true,
			max: 80,
			min: 70
		}),
		require('imagemin-pngquant')({ quality: '75-85' }),
		gulpImagemin.svgo({
			plugins: [
				{ removeViewBox: false }
			]
		})
	],

	icons: [
		gulpImagemin.svgo({
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

export const posthtmlConfig = {
	plugins: [
		require('posthtml-attrs-sorter')({
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

export const ghPagesConfig = {
	branch: 'build'
};
