import statuses from '../constants/statuses';

const defaultIndentLength = 4;

const defaultStrStatus = '    ';
const plusStrStatus = '  + ';
const minusStrStatus = '  - ';

const generateIndent = (count = 0) => ' '.repeat(count);

const getStrStatus = (status) => {
  if (status === statuses.added) {
    return plusStrStatus;
  } else if (status === statuses.removed) {
    return minusStrStatus;
  }
  return defaultStrStatus;
};

const render = (comparedData) => {
  const renderAst = (data, spaceCount = 0) => {
    const indent = generateIndent(spaceCount);

    const iter = (item) => {
      const { type, name, status, children } = item;
      const strStatus = getStrStatus(status);

      if (type === 'list') {
        return `${indent}${strStatus}${name}: {\n${renderAst(children, spaceCount + defaultIndentLength)}    ${indent}}\n`;
      }

      const [before, after] = children;

      if (status === statuses.changed) {
        return `${indent}${plusStrStatus}${name}: ${after}\n${indent}${minusStrStatus}${name}: ${before}\n`;
      }

      const value = before !== undefined ? before : after;
      return `${indent}${strStatus}${name}: ${value}\n`;
    };

    return data.map(iter).join('');
  };

  return `{\n${renderAst(comparedData)}}`;
};

export default render;
