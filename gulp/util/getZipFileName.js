import path from "path";
import getTimestamp from "./getTimestamp";
import { kebabCase } from "lodash";

const CWD = process.cwd();

const getZipFileName = () => {
  const directoryName = path.basename(CWD) || "dist";

  return `${kebabCase(directoryName)}-${getTimestamp()}.zip`;
};

export default getZipFileName;
