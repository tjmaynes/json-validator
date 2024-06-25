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

ensure_cloudflare_page_exists:
	chmod +x ./scripts/cloudflare/ensure-cloudflare-pages-exists.sh
	./scripts/cloudflare/ensure-cloudflare-pages-exists.sh "jsonv"

deploy_cloudflare_page:
	chmod +x ./scripts/cloudflare/cloudflare-page-deploy.sh
	./scripts/cloudflare/cloudflare-page-deploy.sh "jsonv" "dist"

deploy: install build test ensure_cloudflare_page_exists deploy_cloudflare_page