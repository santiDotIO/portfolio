'use strict';
require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const host = require('./libs/hostParser');
const middleware = require('./libs/middleware');
const routes = require('./libs/routes');

// project root
const projectRoot = path.join(__dirname, './');
// static files (images, css, js, etc)
const staticFiles = projectRoot+'public';
// handlebar root templates location
const viewFields = projectRoot+'src/hbs/templates';
// handlebars partials location
const partialsFiles = projectRoot+'src/hbs/partials';


const server = express();
server.locals.data = require(projectRoot+'src/data.json');
server.locals.isProd = host.isProd('santiagojsosa.com');

server.use(express.static(staticFiles));
server.use(middleware.redirectToTop)
server.use(middleware.prefixWWW)

server.set('view engine', 'hbs');
server.set('views', viewFields);

hbs.registerPartials(partialsFiles);
hbs.localsAsTemplateData(server);

server.use((req, res) =>{
    if (req.hostname != 'localhost' || req.hostname != 'santisosa.com') {
        res.redirect(301, 'https://santisosa.com');
    }
});

// main route
server.get('/', routes.main);

server.listen(process.env.PORT, ()=>host.log());