import genDiff from '../gendiff';

test('compare files', () => {
  const path1 = `${__dirname}/__mocks__/before.json`;
  const path2 = `${__dirname}/__mocks__/after.json`;

  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  expect(genDiff(path1, path2)).toEqual(result);
});
