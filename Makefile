_current_dir=$(shell pwd)
# _dockerNode=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app node:6.9
# _dockerNodeGulp=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app/gulp node:6.9demon

npm-install:
	@# use to ensure all modules are installed
	npm install

server:
	@# initiate node
	node index.js


build-prod: npm-install
	@# Look at./gulp/README.md for more info
	cd gulp && npx gulp --production

watch:
	cd gulp && npx gulp watch

server-dev:
	@# Using nodemon to watch files over gulp
	@# This allows to restart server if FE files change and also handlebars
	npx nodemon -e js,hbs,scss,json index.js

