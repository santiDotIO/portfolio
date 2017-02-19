'use strict';
// paths
const path = require('../helpers/paths.js');
const argv = require('yargs').argv;

// gulp plugins
const gulp = require('gulp');
var gulpif = require('gulp-if');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const injectTarget = require('gulp-inject-target');

// scss plugins
const autoprefixer = require('gulp-autoprefixer');

let scssConfig = {}
scssConfig.outputStyle = argv.production ? 'compressed' : 'expanded'
scssConfig.sourceMapEmbed = argv.production ? false : true;

const prefixConf = {
    browsers: [
    'last 2 versions',
    'ie >= 9',
    'iOS >= 5'
    ]
}
const injectConf = {
    target: path.dest.cssTarget,
    selector: path.dest.cssSelector
}
module.exports = () => {
    return gulp.src(path.src.scss)
        .pipe(
            sass(scssConfig)
            .on('error', sass.logError)
        )
        .pipe( autoprefixer(prefixConf) )
        .pipe(
            gulpif(argv.production, injectTarget(injectConf))
        )
        .pipe(
            gulpif(!argv.production, gulp.dest(path.dest.css))
        )
    .pipe( notify("SCSS - Complete") );
}
