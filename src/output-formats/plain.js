import types from '../constants';

const render = (comparedData) => {
  const renderAst = (data) => {
    const iter = (item) => {
      const { type, name, children, before, after } = item;

      if (children !== undefined) {
        if (type === types.removed) {
          return `Property '${name}' was removed\n`;
        } else if (type === types.added) {
          return `Property '${name}' was added with complex value\n`;
        }
        return renderAst(children);
      }

      if (type === types.removed) {
        return `Property '${name}' was removed\n`;
      } else if (type === types.added) {
        return `Property '${name}' was added with value: ${after}\n`;
      } else if (type === types.changed) {
        return `Property '${name}' was updated. From '${before}' to '${after}'\n`;
      }

      return '';
    };

    return data.map(iter).join('');
  };

  return renderAst(comparedData);
};

export default render;
