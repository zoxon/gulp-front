import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import path from 'path';
import { plumberConfig, imageminConfig } from '../config';

const moduleImages = () =>
	gulp.src('**/*.{jpg,gif,svg,png}', { cwd: 'source/modules/*/images' })
		.pipe(plumber(plumberConfig))
		.pipe(rename(file => {
			const f = path.parse(file.dirname);
			const f2 = path.parse(f.dir);
			const moduleName = f2.base;

			file.dirname = '';
			file.basename = moduleName + '__' + file.basename;

		}))
		.pipe(changed('dest/assets/images'))
		.pipe(imagemin(imageminConfig.images))
		.pipe(gulp.dest('dest/assets/images'));

export default moduleImages;
