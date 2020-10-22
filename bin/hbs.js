const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

class HandleBarsCompiler {
    constructor(production = false) {
        this.hbs = Handlebars.create();
        this.template = undefined;
        this.HBS_ENTRY    = path.resolve(__dirname, '../src/hbs/index.hbs');
        this.HBS_PARTIALS = path.resolve(__dirname, '../src/hbs/partials/');
        this.OUTPUT_DIR   = path.resolve(__dirname, '../public/index.html');
        this.HBS_DATA     = require( path.resolve(__dirname, '../src/data.json') );
        
        this.HBS_DATA.isProd = production;
        this.configure();
    }
    
    compile(){
        const output = this.template(this.HBS_DATA);
        fs.writeFileSync(this.OUTPUT_DIR, output);
    }
        
    configure() {
        const main = fs.readFileSync( this.HBS_ENTRY ).toString();
        fs.readdirSync(this.HBS_PARTIALS).map(this.registerPartials.bind(this))
        this.registerHelpers();
        this.template = this.hbs.compile(main);
    }

    registerPartials(file) {
        // get file contetns
        const content = fs.readFileSync( path.resolve(this.HBS_PARTIALS, file) ).toString()
        // register partial name sans extension
        this.hbs.registerPartial(file.replace('.hbs', ''), content);
    }
    
    registerHelpers() {
        this.hbs.registerHelper('date', (propName = 'toDateString') =>  (new Date())[propName]() )
    }
}

module.exports = HandleBarsCompiler;


