'use strict';
const join = require('path').join;

// Absolute paths to project
const projectRoot = join(__dirname, '../..');
// reference for FE js modules
const nodeModules = projectRoot + '/node_modules';

// path to export for Gulp use
var paths = {};

// Absolute path to source files
paths.src = {};
paths.src.scss = projectRoot + '/src/scss/*.scss',

paths.src.js = [
    // main JS file
    projectRoot + '/src/js/app.js',
]

// Directories to watch
paths.watch = {
    scss: projectRoot + '/src/scss/**/*.scss',
    js: projectRoot + '/src/js/**/*.js',
};

// where to drop compiled files
paths.dest = {
    css: projectRoot + '/public/css/',
    js: projectRoot + '/public/js/'
};

module.exports = paths;
