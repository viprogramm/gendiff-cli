install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js -h

publish:
	npm publish

clean:
	npm run clean

build: clean
	npm run build

lint:
	npm run eslint -- src