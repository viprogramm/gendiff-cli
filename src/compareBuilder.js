import difference from 'lodash/difference';

const defaultIndentLength = 4;

const STATUSES = {
  NOT_CHANGED: 0,
  CHANGED: 1,
  ADDED: 2,
  REMOVED: 3,
};

const defaultStrStatus = '    ';
const plusStrStatus = '  + ';
const minusStrStatus = '  - ';

const generateIndent = (count = 0) => {
  const iter = (spacesCount, str = '') => {
    if (spacesCount < 1) {
      return str;
    }
    return iter(spacesCount - 1, ` ${str}`);
  };
  return iter(count);
};

const getStrStatus = (status) => {
  if (status === STATUSES.ADDED) {
    return plusStrStatus;
  } else if (status === STATUSES.REMOVED) {
    return minusStrStatus;
  }
  return defaultStrStatus;
};

const render = (comparedData) => {
  const iter = (data, spacesCount = 0) => {
    const result = data.reduce((cur, obj) => {
      const { type, name, status, children, showStatus } = obj;
      const indent = generateIndent(spacesCount);
      let strStatus = getStrStatus(status);
      if (showStatus === false) {
        strStatus = defaultStrStatus;
      }

      if (type === 'list') {
        return `${cur}${indent}${strStatus}${name}: {\n${iter(children, spacesCount + defaultIndentLength)}    ${indent}}\n`;
      }

      const [before, after] = children;

      if (status !== STATUSES.CHANGED) {
        const value = before !== undefined ? before : after;
        return `${cur}${indent}${strStatus}${name}: ${value}\n`;
      }

      return `${cur}${indent}${plusStrStatus}${name}: ${after}\n${indent}${minusStrStatus}${name}: ${before}\n`;
    }, '');
    return `${result}`;
  };

  return `{\n${iter(comparedData)}}`;
};


const compare = (before = {}, after = {}, showStatus = true) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const removedKeys = difference(beforeKeys, afterKeys);
  const addedKeys = difference(afterKeys, beforeKeys);

  const iter = (obj, key) => {
    let status;

    if (removedKeys.includes(key)) {
      status = STATUSES.REMOVED;
    } else if (addedKeys.includes(key)) {
      status = STATUSES.ADDED;
    } else if (before[key] === after[key]) {
      status = STATUSES.NOT_CHANGED;
    } else {
      status = STATUSES.CHANGED;
    }

    if (before[key] instanceof Object || after[key] instanceof Object) {
      const childrenShowStatus = showStatus &&
        (status === STATUSES.CHANGED || status === STATUSES.NOT_CHANGED);

      return [
        ...obj,
        {
          type: 'list',
          name: key,
          status,
          showStatus,
          children: compare(before[key], after[key], childrenShowStatus),
        },
      ];
    }

    return [
      ...obj,
      {
        type: 'item',
        name: key,
        status,
        showStatus,
        children: [before[key], after[key]],
      },
    ];
  };

  const data = beforeKeys.reduce(iter, []);

  return addedKeys.reduce(iter, data);
};

export default {
  build(before, after) {
    const comparedData = compare(before, after);
    return render(comparedData);
  },
};

