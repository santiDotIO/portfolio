dev:
	./node_modules/.bin/nodemon -e js,hbs,scss,json index.js

watch:
	cd gulp && ../node_modules/.bin/gulp watch

build:
	cd gulp && ../node_modules/.bin/gulp --production