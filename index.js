'use strict';
require('dotenv').config();

const joinPath = require('path').join;
const express = require('express');
const hbs = require('hbs');
const hbsData = require('./src/data.json');

const server = express();
const staticFiles = joinPath(__dirname, './', 'public');

const viewFields = joinPath(__dirname, './', 'src/hbs/templates');
const partialsFiles = joinPath(__dirname, './', 'src/hbs/partials');


server.use(express.static(staticFiles));
server.set('view engine', 'hbs');
server.set('views', viewFields);
hbs.registerPartials(partialsFiles);

server.get('/', (req, res) => {
	return res.render('index', hbsData);
});

server.listen(process.env.PORT, ()=>console.log(`http://localhost:${process.env.PORT}`));