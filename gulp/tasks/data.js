import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import yaml from 'gulp-yaml';
import mergeJson from 'gulp-merge-json';
import { plumberConfig } from '../config';


const data = () =>
	src([ '**/*.yml', '!**/_*.yml' ], { cwd: 'source/modules/*/data' })
		.pipe(plumber(plumberConfig))
		.pipe(yaml({ space: '\t' }))
		.pipe(mergeJson({ fileName: 'data.json' }))
		.pipe(dest('tmp'));

export default data;
