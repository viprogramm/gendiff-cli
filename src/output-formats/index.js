// @flow

import text from './text';
import plain from './plain';
import json from './json';

export default (outputFormat: string) => {
  switch (outputFormat) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      return text;
  }
};
