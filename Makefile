_current_dir=$(shell pwd)
# _dockerNode=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app node:6.9
# _dockerNodeGulp=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app/gulp node:6.9
_gulp=../node_modules/.bin/gulp
_nodemon=./node_modules/.bin/nodemon

update:
	@# use to ensure all modules are installed
	npm install

build-prod:
	@# Look at./gulp/README.md for more info
	cd gulp && $(_gulp) --production

watch:
	cd gulp && $(_gulp) watch

server:
	@# initiate node
	node index.js

server-dev:
	@# Using nodemon to watch files over gulp
	@# This allows to restart server if FE files change and also handlebars
	$(_nodemon) -e js,hbs,scss,json index.js

copy-to-server:
	@# executed from Bitbucket pipline
	@# ssh portfolio@159.203.136.184 'cd `pwd`/app/web && make do-deploy'
	scp -r ./public/css portfolio@159.203.136.184:app/web/public/css
	scp -r ./public/js portfolio@159.203.136.184:app/web/public/js

sync-server:
	ssh docker-user@45.55.176.81 'cd `pwd`/portfolio-static/web && git pull origin master'
	ssh docker-user@45.55.176.81 'cd `pwd`/portfolio-static && docker-compose down; docker-compose up -d'
