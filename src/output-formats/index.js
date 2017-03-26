import text from './text';
import plain from './plain';
import json from './json';
import jsonDataAdapter from './dataAdapters/json';

export default (outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return plain;
    case 'json':
      return data => json(jsonDataAdapter(data));
    default:
      return text;
  }
};
