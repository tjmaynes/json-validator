install:
	npm install
	npx playwright install

.PHONY: test
test:
	npm test

acceptance:
	npm run test:acceptance

ci_test: acceptance
	CI=true npm test

build:
	npm run build

lint:
	npm run lint

start:
	npm run start

ship_it: build ci_test
	git push

deploy: build ci_test