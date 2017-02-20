_current_dir=$(shell pwd)
_dockerNode=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app node:6.9
_dockerNodeGulp=docker run --rm -v $(_current_dir):/usr/src/app --workdir /usr/src/app/gulp node:6.9
_gulp=../node_modules/.bin/gulp
_nodemon=./node_modules/.bin/gulp

update:
	@# use to ensure all modules are installed
	$(_dockerNode) npm install

build-prod:
	@# Look at./gulp/README.md for more info
	$(_dockerNodeGulp) $(_gulp) --production

watch:
	$(_dockerNodeGulp) $(_gulp) watch

server:
	@# initiate node
	node index.js

server-dev:
	@# Using nodemon to watch files over gulp
	@# This allows to restart server if FE files change and also handlebars
	$(_nodemon) -e js,hbs,scss,json --watch src index.js

deploy:
	@# executed from Bitbucket pipline
	ssh portfolio@159.203.136.184 'cd `pwd`/app/web && make do-deploy'

make do-deploy:
	git pull origin master
	make update
	make build-prod
	cd ../ && docker-compose restart