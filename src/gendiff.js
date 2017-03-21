import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';

const parse = (data1 = {}, data2 = {}) => {
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

const getDataByPath = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();

  switch (extname) {
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    case '.yaml':
      return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    case '.ini':
      return ini.parse(fs.readFileSync(filePath, 'utf8'));
    default:
      throw new Error('Wrong file format');
  }
};

const isSameExtname = (path1, path2) =>
  path.extname(path1).toLowerCase() === path.extname(path2).toLowerCase();

const genDiff = (path1 = '', path2 = '') => {
  if (!isSameExtname(path1, path2)) {
    throw new Error('Couldn\'t compare files with different file formats');
  }

  const data1 = getDataByPath(path1);
  const data2 = getDataByPath(path2);

  const parsedData = parse(data1, data2);
  return render(parsedData);
};

export default genDiff;
