dev:
	./node_modules/.bin/nodemon -e js,hbs,scss index.js

watch:
	cd gulp && ../node_modules/.bin/gulp watch