import genDiff from '../src/gendiff';

test('compare JSON files', () => {
  const path1 = `${__dirname}/__fixtures__/before.json`;
  const path2 = `${__dirname}/__fixtures__/after.json`;

  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  expect(genDiff(path1, path2)).toEqual(result);
});

test('compare YAML files', () => {
  const path1 = `${__dirname}/__fixtures__/before.yaml`;
  const path2 = `${__dirname}/__fixtures__/after.yaml`;

  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  expect(genDiff(path1, path2)).toEqual(result);
});
