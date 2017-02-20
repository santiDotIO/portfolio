'use strict';
require('dotenv').config();

const joinPath = require('path').join;
const express = require('express');
const hbs = require('hbs');

const server = express();
const staticFiles = joinPath(__dirname, './', 'public');
const host = require('./libs/hostParser');

const hbsData = require('./src/data.json');
const viewFields = joinPath(__dirname, './', 'src/hbs/templates');
const partialsFiles = joinPath(__dirname, './', 'src/hbs/partials');
let isProd = /santiagojsosa.com/.test(host);
server.locals.isProd = host.isProd('santiagojsosa.com');

server.use(express.static(staticFiles));
server.set('view engine', 'hbs');
server.set('views', viewFields);
hbs.registerPartials(partialsFiles);

// main route
server.get('/', (req, res) => {
	console.log(new Date(), 'index')
	hbsData.isProd = isProd;
	return res.render('index', hbsData);
});


// redirect non-www to www
server.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next(); 
  }
})

// redirect all non-files to root
server.all('/:path', (req, res) => {
	console.log(new Date(), 'redirect', req.params.path)
	return res.status(301).redirect('/');
});


// console.log(process.env);
server.listen(process.env.PORT, ()=>console.log(host));server.listen(process.env.PORT, ()=>host.log());