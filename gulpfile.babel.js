import { task, series } from 'gulp';
import build from './gulp/tasks/build';
import { zip } from './gulp/tasks/zip';
import dev from './gulp/tasks/dev';
import { deploy } from './gulp/tasks/deploy';

// Main tasks
task('build', build);
task('zip', zip);
task('dev', dev);
task('deploy', deploy);

// Semver
import { major, minor, patch, reset } from './gulp/tasks/semver';

task('semver:major', major);
task('semver:minor', minor);
task('semver:patch', patch);
task('semver:reset', reset);

// Default task
task('default', series('dev'));
