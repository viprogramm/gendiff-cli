import fs from 'fs';
import path from 'path';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';
import getParser from './parsers';

const compare = (data1 = {}, data2 = {}) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const data = reduce(keys1, (obj, key) => ({
    ...obj,
    [key]: {
      oldValue: data1[key],
      value: data2[key],
    },
  }), {});

  const remainingKeys = difference(keys2, keys1);

  return reduce(remainingKeys, (obj, key) => ({
    ...obj,
    [key]: {
      oldValue: undefined,
      value: data2[key],
    },
  }), data);
};

const render = (data) => {
  const result = reduce(Object.keys(data), (cur, key) => {
    const obj = data[key];
    if (obj.value === obj.oldValue) {
      return `${cur}    ${key}: ${obj.value}\n`;
    } else if (obj.oldValue !== undefined && obj.value === undefined) {
      return `${cur}  - ${key}: ${obj.oldValue}\n`;
    } else if (obj.oldValue === undefined && obj.value !== undefined) {
      return `${cur}  + ${key}: ${obj.value}\n`;
    }
    return `${cur}  + ${key}: ${obj.value}\n  - ${key}: ${obj.oldValue}\n`;
  }, '\n');
  return `{${result}}`;
};

const getFileFormatByPath = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  return extname.length > 1 ? extname.substr(1).toLowerCase() : extname;
};

const getDataByPath = (filePath) => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const format = getFileFormatByPath(filePath);
  const parser = getParser(format);
  return parser(fileData);
};

const isSameFormat = (path1, path2) =>
  getFileFormatByPath(path1) === getFileFormatByPath(path2);

const genDiff = (path1, path2) => {
  if (!isSameFormat(path1, path2)) {
    throw new Error('Couldn\'t compare files with different file formats');
  }

  const data1 = getDataByPath(path1);
  const data2 = getDataByPath(path2);

  const comparedData = compare(data1, data2);
  return render(comparedData);
};

export default genDiff;
