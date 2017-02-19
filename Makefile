update:
	@# use to ensure all modules are installed
	npm install;

nodejs:
	@# init node
	node index.js

server-dev:
	@# Using nodemon to watch files over gulp
	@# This allows to restart server if FE files change and also handlebars
	./node_modules/.bin/nodemon -e js,hbs,scss,json --watch src --exec "make boot-dev";

build-prod:
	@# Look at./gulp/README.md for more info
	cd gulp && ../node_modules/.bin/gulp --production

build-dev:
	@# Look at./gulp/README.md for more info
	cd gulp && ../node_modules/.bin/gulp

boot-prod:
	@# ensure all assets are installed
	make update
	@# build FE assets
	make build-prod
	@# run server
	make nodejs

boot-dev:
	@# build assets with mapping
	make build-dev 
	@# run server
	make nodejs

test:
	echo $(date) > './text.txt'
	git commit -am "test $(date +%Y-%m-%d:%H:%M:%S)"