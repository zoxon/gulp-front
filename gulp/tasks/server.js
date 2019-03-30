import browserSync from "../util/getBrowserSyncInstance";
import { browserSyncConfig } from "../config";

export const server = () => browserSync.init(browserSyncConfig);

export const reload = done => {
  browserSync.reload();
  done();
};
