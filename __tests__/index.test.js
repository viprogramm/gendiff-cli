import genDiff from '../src';

const fixturesFolder = `${__dirname}/__fixtures__`;

describe('files with simple structure', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  test('compare JSON files', () => {
    const path1 = `${fixturesFolder}/before.json`;
    const path2 = `${fixturesFolder}/after.json`;

    expect(genDiff(path1, path2)).toEqual(result);
  });

  test('compare YAML files', () => {
    const path1 = `${fixturesFolder}/before.yaml`;
    const path2 = `${fixturesFolder}/after.yaml`;

    expect(genDiff(path1, path2)).toEqual(result);
  });

  test('compare INI files', () => {
    const path1 = `${fixturesFolder}/before.ini`;
    const path2 = `${fixturesFolder}/after.ini`;

    expect(genDiff(path1, path2)).toEqual(result);
  });
});

describe('files with nested structure', () => {
  test('compare JSON files', () => {
    const path1 = `${fixturesFolder}/before-nested.json`;
    const path2 = `${fixturesFolder}/after-nested.json`;

    const result = `{
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

    expect(genDiff(path1, path2)).toEqual(result);
  });

  test('compare YAML files', () => {
    const path1 = `${fixturesFolder}/before-nested.yaml`;
    const path2 = `${fixturesFolder}/after-nested.yaml`;

    const result = `{
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

    expect(genDiff(path1, path2)).toEqual(result);
  });


  test('compare INI files', () => {
    const path1 = `${fixturesFolder}/before-nested.ini`;
    const path2 = `${fixturesFolder}/after-nested.ini`;

    const result = `{
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

    expect(genDiff(path1, path2)).toEqual(result);
  });
});
