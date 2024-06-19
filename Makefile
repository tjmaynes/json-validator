install:
	npm install
	npx playwright install --with-deps

dev:
	npm run dev

.PHONY: test
test: unit acceptance

unit:
	CI=true npm test

acceptance:
	npm run test:acceptance

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