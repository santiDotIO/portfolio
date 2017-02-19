update:
	@# use to ensure all modules are installed
	@# npm install;
	docker run --rm -v `$(HOME)`/app/web:/usr/src/app --workdir /usr/src/app node:6.9 npm install;

nodejs:
	@# init node
	node index.js

server-dev:
	@# Using nodemon to watch files over gulp
	@# This allows to restart server if FE files change and also handlebars
	./node_modules/.bin/nodemon -e js,hbs,scss,json --watch src --exec "make boot-dev";

build-prod:
	@# Look at./gulp/README.md for more info
	@# cd gulp && ../node_modules/.bin/gulp --production
	docker run --rm -v `$(HOME)`/app/web:/usr/src/app --workdir /usr/src/app/gulp node:6.9 ../node_modules/.bin/gulp --production;

build-dev:
	@# Look at./gulp/README.md for more info
	cd gulp && ../node_modules/.bin/gulp

boot-prod:
	@# run server
	make nodejs

deploy:
	ssh portfolio@159.203.136.184 'cd `pwd`/app/web && make do-deploy'

make do-deploy:
	git pull origin master
	make update
	make build-prod
	cd ../ && docker-compose restart