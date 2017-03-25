import difference from 'lodash/difference';
import union from 'lodash/union';

const defaultIndentLength = 4;

const statuses = {
  not_changed: 0,
  changed: 1,
  added: 2,
  removed: 3,
};

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

const getStatus = (before, after, key) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const removedKeys = difference(beforeKeys, afterKeys);
  const addedKeys = difference(afterKeys, beforeKeys);

  if (before[key] === after[key]) {
    return statuses.not_changed;
  } else if (addedKeys.includes(key)) {
    return statuses.added;
  } else if (removedKeys.includes(key)) {
    return statuses.removed;
  }
  return statuses.changed;
};

const compare = (before = {}, after = {}, setStatus = true) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const allKeys = union(beforeKeys, afterKeys);

  return allKeys.map((key) => {
    const status = setStatus ? getStatus(before, after, key) : null;

    if (before[key] instanceof Object || after[key] instanceof Object) {
      const childrenSetStatus = setStatus &&
        status !== statuses.added && status !== statuses.removed;

      return {
        type: 'list',
        name: key,
        status,
        children: compare(before[key], after[key], childrenSetStatus),
      };
    }

    return {
      type: 'item',
      name: key,
      status,
      children: [before[key], after[key]],
    };
  });
};

export default (before, after) => {
  const comparedData = compare(before, after);
  return render(comparedData);
};
