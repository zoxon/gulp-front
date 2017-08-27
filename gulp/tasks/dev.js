import { series, parallel } from 'gulp';
import { server } from './server';
import build from './build';
import watch from './watch';

const dev = series(
  build,
  parallel(
    server,
    watch
  )
);

export default dev;
