import browserSync from '../util/getBrowserSyncInstance';
import { browserSyncConfig } from '../config';

export const serve = () =>
	browserSync.init(browserSyncConfig);

export const reload = () => calback => {
	browserSync.reload();
	calback();
};
