#!/usr/bin/env node
const args = process.argv.slice(2);
const FileCopy = require('./bin/copy');
const HandleBarsCompiler = require('./bin/hbs');


// console.log(tailwindcss)
switch (args[0]) {
    case 'hbs':
        (new HandleBarsCompiler()).compile();
    break;
    case 'copy':
        const copyInstace = new FileCopy([
            'montserrat_alternates/MontserratAlternates-Light.ttf',
            'montserrat_alternates/MontserratAlternates-Medium.ttf',
            'montserrat_alternates/MontserratAlternates-Black.ttf',
        ]);
        
        copyInstace.src = '/src/assets/';
        copyInstace.dest = '/public/assets/fonts/';
        copyInstace.copy();
    break;
}