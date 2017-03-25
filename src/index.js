import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import compare from './compare';

const getFileFormatByPath = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  return extname.length > 1 ? extname.substr(1).toLowerCase() : extname;
};

const getDataByPath = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const format = getFileFormatByPath(filePath);
  return getParser(format)(fileData);
};

const isSameFormat = (path1, path2) =>
getFileFormatByPath(path1) === getFileFormatByPath(path2);

const genDiff = (pathBefore, pathAfter) => {
  if (!isSameFormat(pathBefore, pathAfter)) {
    throw new Error('Couldn\'t compare files with different file formats');
  }

  const before = getDataByPath(pathBefore);
  const after = getDataByPath(pathAfter);

  return compare(before, after);
};

export default genDiff;
