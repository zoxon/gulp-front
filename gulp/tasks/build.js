'use strict';
import { series, parallel } from 'gulp';
import cleanup from '../tasks/cleanup';
import { html } from '../tasks/html';
import icons from '../tasks/icons';
import sprite from '../tasks/sprite';
import moduleImages from '../tasks/moduleImages';
import assets from '../tasks/assets';
import scripts from '../tasks/scripts';
import css from '../tasks/css';


const build = series(
	cleanup,
	series(
		parallel(
			html,
			icons,
			sprite,
			moduleImages,
			assets,
			scripts
		),
		css
	)
);

export default build;
