import del from "del";
import logger from "gulplog";

import { delConfig } from "../config";

export const cleanup = done =>
  del(delConfig).then(() => {
    logger.info("Folders `build` and `tmp` were successfully deleted");
    done();
  });
