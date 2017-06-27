import gulp from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import svgSymbols from 'gulp-svg-symbols';
import gulpIf from 'gulp-if';
import gulpRename from 'gulp-rename';
import { isDevelopment } from '../util/env';
import {
	plumberConfig,
	imageminConfig,
	svgSymbolsConfig
} from '../config';

const icons = () =>
	gulp.src([ '**/*.svg', '!**/_*.svg' ], { cwd: 'source/static/icons' })
		.pipe(plumber(plumberConfig))
		.pipe(gulpIf(!isDevelopment, imagemin(imageminConfig.icons)))
		.pipe(svgSymbols(svgSymbolsConfig))
		.pipe(gulpIf(/\.styl$/, gulp.dest('tmp')))
		.pipe(gulpIf(/\.svg$/, gulpRename('icons.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dest/assets/images')));

export default icons;
