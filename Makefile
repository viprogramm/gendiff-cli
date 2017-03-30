install:
	npm install

start:
	npm run babel-node -- ./src/bin/gendiff.js ./__tests__/__fixtures__/before.json  ./__tests__/__fixtures__/after.json

publish: test lint
	npm publish

build:
	rm -rf dist
	npm run build

lint:
	npm run eslint -- src

flow:
	npm run flow

test:
	npm test