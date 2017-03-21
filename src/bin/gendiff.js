#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig) => {
    console.log(firstConfig);
    console.log(secondConfig);
  })
  .parse(process.argv);
