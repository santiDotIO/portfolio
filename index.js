'use strict';
require('dotenv').config();

const joinPath = require('path').join;
const express = require('express');
const server = express();

const staticFiles = joinPath(__dirname, './', 'public');

server.use(express.static(staticFiles));

server.listen(process.env.PORT, ()=>console.log(`http://localhost:${process.env.PORT}`));