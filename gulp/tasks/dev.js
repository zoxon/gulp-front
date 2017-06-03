import { series, parallel } from 'gulp';
import { serve } from '../tasks/server';
import build from '../tasks/build';
import watch from '../tasks/watch';

const dev = series(
	build,
	parallel(
		serve,
		watch
	)
);

export default dev;
