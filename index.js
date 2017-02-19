'use strict';
require('dotenv').config();
const host = (typeof process.env.VIRTUAL_HOST == 'undefiend') ? `http://localhost:${process.env.PORT}` : `http://${process.env.VIRTUAL_HOST}`

const joinPath = require('path').join;
const express = require('express');
const bodyParser = require('body-parser');

const hbs = require('hbs');
const hbsData = require('./src/data.json');

const server = express();
const staticFiles = joinPath(__dirname, './', 'public');

const viewFields = joinPath(__dirname, './', 'src/hbs/templates');
const partialsFiles = joinPath(__dirname, './', 'src/hbs/partials');
let isProd = /santiagojsosa.com/.test(host);

server.use(express.static(staticFiles));
server.set('view engine', 'hbs');
server.set('views', viewFields);
hbs.registerPartials(partialsFiles);

server.use(bodyParser.json()); // for parsing application/json

server.get('/', (req, res) => {
	console.log(new Date(), 'index')
	hbsData.isProd = isProd;
	return res.render('index', hbsData);
});

server.post('/_deploy', (req, res) => {
	const isBitBucket = /Bitbucket-Webhooks/.test(req.get('User-Agent'));
	const pushToMaster = req.body.push.changes[0].new.name === 'master'

	console.log(new Date(), req.get('User-Agent'))
	console.log(req.body.push.changes[0].new.name);
	
	if ( isBitBucket && pushToMaster) {
		return res.send('deploy script');
	}
	return res.status(403).redirect('/');
});


// redirect all non-files to root
server.all('/:path', (req, res) => {
	console.log(new Date(), 'redirect', req.params.path)
	return res.status(301).redirect('/');
});


// console.log(process.env);
server.listen(process.env.PORT, ()=>console.log(host));