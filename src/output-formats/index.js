import text from './text';
import plain from './plain';

export default (outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return plain;
    default:
      return text;
  }
};
