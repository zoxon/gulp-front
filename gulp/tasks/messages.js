import logger from "gulplog";
import { NODE_ENV } from "../util/env";

export const startMessage = done => {
  logger.warn(`Starting app in [${NODE_ENV.toUpperCase()}] mode...`);
  done();
};
