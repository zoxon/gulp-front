import { src, series } from 'gulp';
import ghPages from 'gulp-gh-pages';
import { ghPagesConfig } from '../config';
import build from './build';


export const publish = () =>
	src('**/*', { cwd: 'dest' })
		.pipe(ghPages(ghPagesConfig));

export const deploy =
	series(
		build,
		publish
	);
