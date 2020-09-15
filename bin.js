#!/usr/bin/env node
const args = process.argv.slice(2);
const HandleBarsCompiler = require('./bin/hbs');
const { exec } = require("child_process");


// console.log(tailwindcss)
switch (args[0]) {
    case 'hbs':
        const hbs = new HandleBarsCompiler();
        hbs.compile();
    break;
}