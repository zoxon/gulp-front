'use strict';

var gulp = require('gulp');
var loadTask = require('./gulp/util/load-task.js');


// Main tasks
loadTask('cleanup', './gulp/tasks/cleanup.js');
loadTask('serve', './gulp/tasks/serve.js');
loadTask('reload', './gulp/tasks/reload.js');
loadTask('build:css', './gulp/tasks/css.js');
loadTask('build:data', './gulp/tasks/data.js');
loadTask('build:pages', './gulp/tasks/pages.js');
loadTask('build:assets', './gulp/tasks/assets.js');
loadTask('modules:assets', './gulp/tasks/modules/assets.js');
loadTask('build:scripts', './gulp/tasks/scripts.js');
loadTask('build:icons', './gulp/tasks/icons.js');
loadTask('build:sprite', './gulp/tasks/sprite.js');
loadTask('deploy:publish', './gulp/tasks/publish.js');
loadTask('build:zip', './gulp/tasks/build-zip.js');

// Semver
loadTask('semver:patch', './gulp/tasks/semver/patch.js');
loadTask('semver:minor', './gulp/tasks/semver/minor.js');
loadTask('semver:major', './gulp/tasks/semver/major.js');
loadTask('semver:reset', './gulp/tasks/semver/reset.js');

// Service tasks
loadTask('build:html', './gulp/tasks/html.js');
loadTask('build', './gulp/tasks/build.js');
loadTask('zip', './gulp/tasks/zip.js');
loadTask('deploy', './gulp/tasks/deploy.js');
loadTask('dev', './gulp/tasks/dev.js');
loadTask('watch', './gulp/tasks/watch.js');


gulp.task('default', gulp.series('build'));
