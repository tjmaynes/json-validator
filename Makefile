install:
	npm ci
	npx playwright install --with-deps

dev:
	npm run dev

test:
	npm test

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

start:
	npm run start

ship_it: lint build test
	git push

deploy: install build test