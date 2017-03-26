import fs from 'fs';
import genDiff from '../src';

const fixturesFolder = `${__dirname}/__fixtures__`;

describe('files with simple structure', () => {
  const resultText = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  const resultPlain = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true
`;

  const resultJSON = JSON.stringify(JSON.parse(fs.readFileSync(`${fixturesFolder}/result.json`, 'utf8')));

  test('compare JSON files', () => {
    const path1 = `${fixturesFolder}/before.json`;
    const path2 = `${fixturesFolder}/after.json`;

    expect(genDiff(path1, path2)).toEqual(resultText);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
    expect(genDiff(path1, path2, 'json')).toEqual(resultJSON);
  });

  test('compare YAML files', () => {
    const path1 = `${fixturesFolder}/before.yaml`;
    const path2 = `${fixturesFolder}/after.yaml`;

    expect(genDiff(path1, path2)).toEqual(resultText);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
    expect(genDiff(path1, path2, 'json')).toEqual(resultJSON);
  });

  test('compare INI files', () => {
    const path1 = `${fixturesFolder}/before.ini`;
    const path2 = `${fixturesFolder}/after.ini`;

    expect(genDiff(path1, path2)).toEqual(resultText);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
  });
});

describe('files with nested structure', () => {
  const resultText = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  const resultPlain = `Property 'setting2' was removed
Property 'setting6' was removed
Property 'setting4' was added with value: blah blah
Property 'setting5' was added with complex value
Property 'baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
`;

  const resultJSON = JSON.stringify(JSON.parse(fs.readFileSync(`${fixturesFolder}/result-nested.json`, 'utf8')));

  test('compare JSON files', () => {
    const path1 = `${fixturesFolder}/before-nested.json`;
    const path2 = `${fixturesFolder}/after-nested.json`;

    expect(genDiff(path1, path2)).toEqual(resultText);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
    expect(genDiff(path1, path2, 'json')).toEqual(resultJSON);
  });

  test('compare YAML files', () => {
    const path1 = `${fixturesFolder}/before-nested.yaml`;
    const path2 = `${fixturesFolder}/after-nested.yaml`;

    expect(genDiff(path1, path2)).toEqual(resultText);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
    expect(genDiff(path1, path2, 'json')).toEqual(resultJSON);
  });


  test('compare INI files', () => {
    const path1 = `${fixturesFolder}/before-nested.ini`;
    const path2 = `${fixturesFolder}/after-nested.ini`;

    const resultTextINI = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      + setting4: blah blah
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
    const resultPlainINI = `Property 'setting2' was removed
Property 'setting4' was added with value: blah blah
Property 'baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value
`;

    expect(genDiff(path1, path2)).toEqual(resultTextINI);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlainINI);
  });
});
