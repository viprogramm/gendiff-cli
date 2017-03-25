#!/usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
  .version('0.5.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig, options) => {
    console.log(genDiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
