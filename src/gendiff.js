import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
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

const genDiff = (path1 = '', path2 = '') => {
  let data1;
  let data2;

  const extname = path.extname(path1).toLowerCase();

  switch (extname) {
    case '.json':
      data1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
      data2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
      break;
    case '.yaml':
      data1 = yaml.safeLoad(fs.readFileSync(path1, 'utf8'));
      data2 = yaml.safeLoad(fs.readFileSync(path2, 'utf8'));
      break;
    default:
      throw new Error('Wrong file format');
  }

  const parsedData = parse(data1, data2);
  return render(parsedData);
};

export default genDiff;
