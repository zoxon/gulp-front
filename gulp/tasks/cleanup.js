import del from "del";
import logger from "gulplog";

import { delConfig } from "../config";

const cleanup = done =>
  del(delConfig).then(() => {
    logger.info("Folders `build` and `tmp` were suceessfuly deleted");
    done();
  });

export default cleanup;
