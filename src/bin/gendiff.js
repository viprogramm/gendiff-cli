#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.2')
  .usage('[options] <first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
