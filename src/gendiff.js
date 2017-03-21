import fs from 'fs';
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

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path1));
  const data2 = JSON.parse(fs.readFileSync(path2));
  const parsedData = parse(data1, data2);

  return render(parsedData);
};

export default genDiff;
