import statuses from '../constants/statuses';

const render = (comparedData) => {
  const renderAst = (data) => {
    const iter = (item) => {
      const { type, name, status, children } = item;

      if (type === 'list') {
        if (status === statuses.removed) {
          return `Property '${name}' was removed\n`;
        } else if (status === statuses.added) {
          return `Property '${name}' was added with complex value\n`;
        }
        return renderAst(children);
      }

      const [before, after] = children;

      if (status === statuses.removed) {
        return `Property '${name}' was removed\n`;
      } else if (status === statuses.added) {
        return `Property '${name}' was added with value: ${after}\n`;
      } else if (status === statuses.changed) {
        return `Property '${name}' was updated. From '${before}' to '${after}'\n`;
      }

      return '';
    };

    return data.map(iter).join('');
  };

  return renderAst(comparedData);
};

export default render;
