import types from '../constants';

const toJson = ast => ast.reduce((acc, item) => {
  const getNode = (node) => {
    const { type, name, after, before, children } = node;

    if (children) {
      return { [name]: toJson(children) };
    }

    switch (type) {
      case types.added:
        return { [name]: { after } };
      case types.removed:
        return { [name]: { before } };
      case types.changed:
        return { [name]: { before, after } };
      case types.unchanged:
        return { [name]: before };
      default:
        throw new Error('Unknown node type');
    }
  };
  return { ...acc, ...getNode(item) };
}, {});

export default comparedData => JSON.stringify(toJson(comparedData), null, 2);
