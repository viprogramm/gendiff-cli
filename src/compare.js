import difference from 'lodash/difference';
import union from 'lodash/union';
import statuses from './constants/statuses';

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

export default compare;

