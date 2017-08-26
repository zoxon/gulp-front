'use strict';
import { series, parallel } from 'gulp';
import cleanup from './cleanup';
import { html } from './html';
import icons from './icons';
import sprite from './sprite';
import moduleImages from './moduleImages';
import { assets, staticFiles } from './assets';
import scripts from './scripts';
import css from './css';
import serviceWorker from './serviceWorker';


const build = series(
	cleanup,
	series(
		parallel(
			html,
			icons,
			sprite,
			moduleImages,
			assets,
			staticFiles,
			scripts
		),
		css,
		serviceWorker
	)
);

export default build;
