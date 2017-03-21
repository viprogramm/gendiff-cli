install:
	npm install

start:
	npm run babel-node -- ./src/bin/gendiff.js ./src/test/__mocks__/before.json  ./src/test/__mocks__/after.json

publish: test lint
	npm publish

build:
	npm run build
	npm run copy

lint:
	npm run eslint -- src

test:
	npm test