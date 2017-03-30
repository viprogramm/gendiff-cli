// @flow

import types from '../constants';

const defaultIndentLength = 4;

const defaultStrStatus = '    ';
const plusStrStatus = '  + ';
const minusStrStatus = '  - ';

const generateIndent = (count = 0) => ' '.repeat(count);

const getStrStatus = (status) => {
  if (status === types.added) {
    return plusStrStatus;
  } else if (status === types.removed) {
    return minusStrStatus;
  }
  return defaultStrStatus;
};

const render = (comparedData: Object) => {
  const renderAst = (data, spaceCount = 0, showStatus = true) => {
    const indent = generateIndent(spaceCount);

    const iter = (item) => {
      const { type, name, children, before, after } = item;
      const strStatus = getStrStatus(type);

      if (children !== undefined) {
        return `${indent}${strStatus}${name}: {\n${renderAst(children, spaceCount + defaultIndentLength, showStatus && (type === types.changed || type === types.unchanged))}    ${indent}}\n`;
      }

      if (type === types.changed) {
        return `${indent}${plusStrStatus}${name}: ${after}\n${indent}${minusStrStatus}${name}: ${before}\n`;
      }

      const value = before !== undefined ? before : after;
      return `${indent}${showStatus ? strStatus : defaultStrStatus}${name}: ${value}\n`;
    };

    return data.map(iter).join('');
  };

  return `{\n${renderAst(comparedData)}}`;
};

export default render;
