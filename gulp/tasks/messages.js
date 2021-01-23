import logger from "gulplog";
import { NODE_ENV } from "../util/environment";

export const startMessage = (done) => {
  logger.warn(`Starting app in [${NODE_ENV.toUpperCase()}] mode...`);
  done();
};
