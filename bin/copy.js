const { copyFile } = require('fs');
const path = require('path');
const { promisify } = require('util');

class FileCopy {
    set src(val) { this._src = val; }
    set dest(val) { this._dest = val; }
    
    constructor(fileList) {
        this.fsCopy = promisify(copyFile);
        this.fileList = fileList;
    }

    copy() {
        return Promise.all( this.fileList.map(this.copyFiles.bind(this)) ).catch(console.error);
    }
    
    copyFiles(file) {
        return this.fsCopy(
            path.resolve(__dirname, `../${this._src}${file}`), 
            path.resolve(__dirname, `../${this._dest}${file.split('/').pop()}`) 
        );
    }
}

module.exports = FileCopy;