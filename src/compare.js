import difference from 'lodash/difference';
import union from 'lodash/union';
import statuses from './constants';

const getStatus = (before, after, key) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const removedKeys = difference(beforeKeys, afterKeys);
  const addedKeys = difference(afterKeys, beforeKeys);

  if (before[key] === after[key]) {
    return statuses.unchanged;
  } else if (addedKeys.includes(key)) {
    return statuses.added;
  } else if (removedKeys.includes(key)) {
    return statuses.removed;
  }
  return statuses.changed;
};

const compare = (before = {}, after = {}) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const allKeys = union(beforeKeys, afterKeys);

  return allKeys.map((key) => {
    const status = getStatus(before, after, key);

    if (before[key] instanceof Object || after[key] instanceof Object) {
      return {
        name: key,
        type: status,
        children: compare(before[key], after[key]),
      };
    }

    return {
      name: key,
      type: status,
      before: before[key],
      after: after[key],
    };
  });
};

export default compare;

