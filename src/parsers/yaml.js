// @flow

import yaml from 'js-yaml';

export default (data: Object) => yaml.safeLoad(data);
