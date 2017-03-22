import json from './json';
import yaml from './yaml';
import ini from './ini';

export default (format) => {
  const parserList = { json, yaml, ini };
  const parser = parserList[format];
  if (!parser) {
    throw new Error('Wrong file format');
  }
  return parser;
};
