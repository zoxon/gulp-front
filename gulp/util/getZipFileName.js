import path from 'path';
import getTimestamp from './getTimestamp.js';
import {camelCase} from 'change-case';
const CWD = process.cwd();

const getZipFileName = () => {
  const cwdDirName = path.basename(CWD) || 'dist';
  return camelCase(cwdDirName) + '-' + getTimestamp() + '.zip';
};

export default getZipFileName;
