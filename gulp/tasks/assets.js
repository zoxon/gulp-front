import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { plumberConfig, imageminConfig } from '../config';

const imageFilter = filter('**/*.{jpg,gif,svg,png}', { restore: true });
const assets = () =>
	gulp.src([ '**/*.*', '!**/_*.*' ], { cwd: 'source/static/assets' })
		.pipe(plumber(plumberConfig))
		.pipe(changed('dest/assets'))

		// Minify images
		.pipe(imageFilter)
		.pipe(changed('dest/assets'))
		.pipe(imagemin(imageminConfig.images))
		.pipe(imageFilter.restore)

		// Copy other files
		.pipe(gulp.dest('dest/assets'));

export default assets;
