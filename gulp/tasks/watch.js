import gulp from 'gulp';
import { reload } from './server';
import { pages, html } from './html';
import css from './css';
import scripts from './scripts';
import icons from './icons';
import sprite from './sprite';
import moduleImages from './moduleImages';
import { assets, staticFiles } from './assets';

const watch = () => {

	// Modules, pages
	gulp.watch(
		'source/**/*.pug',
		gulp.series(pages, reload)
	);

	// Modules data
	gulp.watch(
		'source/modules/*/data/*.yml',
		gulp.series(html, reload)
	);

	// Static styles
	gulp.watch(
		'source/static/styles/**/*.styl',
		gulp.series(css)
	);

	// Modules styles
	gulp.watch(
		'source/modules/**/*.styl',
		gulp.series(css)
	);

	// Static scripts
	gulp.watch(
		'source/static/scripts/**/*.js',
		gulp.series(scripts, reload)
	);

	// Modules scripts
	gulp.watch(
		'source/modules/**/*.js',
		gulp.series(scripts, reload)
	);

	// Modules images
	gulp.watch(
		'source/modules/*/images/*.{jpg,gif,svg,png}',
		gulp.series(moduleImages, reload)
	);

	// Assets
	gulp.watch(
		'source/static/assets/**/*',
		gulp.series(assets, reload)
	);

	// Svg icons
	gulp.watch(
		'source/static/icons/**/*.svg',
		gulp.series(icons, css, reload)
	);

	// Png sprites
	gulp.watch(
		'source/static/sprite/**/*.png',
		gulp.series(sprite, reload)
	);

	// Static files
	gulp.watch(
		'source/static/public/**/{*,.*}',
		gulp.series(staticFiles)
	);
};

export default watch;
