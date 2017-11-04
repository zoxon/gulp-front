import fs from "fs";
import path from "path";

const CWD = process.cwd();

// Read json and return object
const getJsonData = file =>
  JSON.parse(fs.readFileSync(path.join(CWD, file), "utf8"));

export default getJsonData;
