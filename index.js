'use strict';
require('dotenv').config();
const host = (typeof process.env.VIRTUAL_HOST == 'undefiend') ? `http://localhost:${process.env.PORT}` : `http://${process.env.VIRTUAL_HOST}`

const joinPath = require('path').join;
const express = require('express');
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


server.get('/', (req, res) => {
	hbsData.isProd = isProd;
	return res.render('index', hbsData);
});

server.get('/_deploy', (req, res) => {
	if ( !(/Bitbucket/.test(req.get('User-Agent'))) ) {
		return res.status(301).redirect('/');
	}
	console.log(req.get('User-Agent'))
	return res.send('deploy script');
});


// redirect all non-files to root
server.all('/:path', (req, res) => {
	return res.status(301).redirect('/');
});


// console.log(process.env);
server.listen(process.env.PORT, ()=>console.log(host));