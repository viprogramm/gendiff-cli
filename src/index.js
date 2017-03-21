import program from 'commander';
import genDiff from './gendiff';

export default () => {
  program
    .version('0.1.4')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<first_config> <second_config>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig));
    })
    .parse(process.argv);
};
