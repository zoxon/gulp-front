import path from "path";
import getTimestamp from "./getTimestamp";
import { kebabCase } from "lodash";

const CWD = process.cwd();

const getZipFileName = () => {
  const dirName = path.basename(CWD) || "dist";

  return `${kebabCase(dirName)}-${getTimestamp()}.zip`;
};

export default getZipFileName;
