import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import posthtml from 'gulp-posthtml';
import prettify from 'gulp-prettify';
import getJsonData from '../util/getJsonData';
import {
	plumberConfig,
	pugConfig,
	posthtmlConfig,
	htmlPrettifyConfig
} from '../config';
import data from '../tasks/data';

pugConfig.locals = getJsonData('./tmp/data.json');
export const pages = () =>
	gulp.src([ '**/*.pug', '!**/_*.pug' ], { cwd: 'source/pages' })
		.pipe(plumber(plumberConfig))
		.pipe(pug(pugConfig))
		.pipe(posthtml(posthtmlConfig.plugins, posthtmlConfig.options))
		.pipe(prettify(htmlPrettifyConfig))
		.pipe(gulp.dest('dest'));

gulp.task('pages', pages);


export const html =
	gulp.series(
		data,
		pages
	);
