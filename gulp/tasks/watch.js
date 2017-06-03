import gulp from 'gulp';
import { reload } from '../tasks/server';
import { pages, html } from '../tasks/html';
import css from '../tasks/css';
import scripts from '../tasks/scripts';
import icons from '../tasks/icons';
import sprite from '../tasks/sprite';
import moduleImages from '../tasks/moduleImages';
import assets from '../tasks/assets';

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
		'source/modules/*/*.js',
		gulp.series(scripts, reload)
	);

	// Modules images
	gulp.watch(
		'source/modules/*/images/*.{jpg,gif,svg,png}',
		gulp.series(moduleImages, reload)
	);

	// Static files
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
};

export default watch;
