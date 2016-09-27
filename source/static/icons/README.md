# Gulp-front 
## SVG Icon Sprite

**Action:** copy + create svg sprite
**SourcePath:** `./source/static/icons/*.svg`
**DestPath:** `./dest/assets/images/icons.svg`
**SVGTemplate:** `./source/static/styles/templates/icons-template.svg`
**StylusTemplate:** `./source/static/styles/templates/icons-template.styl`

**Description:** Get all svg files from *SourcePath* and build *defs* based sprite. Move sprite to *DestPath*.

**!!! Warning !!!:** Not support subfolders
