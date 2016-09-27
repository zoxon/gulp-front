# Gulp-front 
## Postprocessed Scripts

**Action:** copy + uglify
**SourcePath:** `./source/static/scripts/**/*.js`
**DestPath:** `./dest/assets/javascripts/**/*.js` + `./dest/assets/javascripts/**/*.min.js`

**Description:** Read dirrectives form js files and insert scripts from *plugins* and *node_modues* folders.
Copy combined javascript files from *SourcePath* to *DestPath*, and add uglify version of file.

Read more about syntax on plugin page https://www.npmjs.com/package/gulp-include

**!!! Warning !!!:** Not support subfolders
