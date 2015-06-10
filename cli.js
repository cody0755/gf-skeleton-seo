/*
Todo: extract code into cli tool:
cli add-page <>
*/


// code below to batch setup js/scss/view etc
require('shelljs/global');
var fs = require('fs');

function createJs(path) {
    createFile('frontend/scripts/', '.js', path);
}

function createView(path) {
    createFile('frontend/views/', '.html', path);
}

function createCSS(path) {
    createFile('frontend/scss/', '.scss', path);
}

function createFile(base, suf, path) {
    var dir,
        file = base+path+suf;
    if (exec('test -e "'+file+'"').code == 0) {
        echo('Warn: already has '+file)
    } else {
        dir = exec('dirname '+file).output.trim();
        echo(dir);
        if(!fs.existsSync(dir)) {
            mkdir('-p', dir);
        }
        exec('touch '+file);
    }
}

function createPage(path) {
    createCSS(path);
    createJs(path);
    createView(path);
}

'index,about,product/list,product/detail,info/message/detail,info/message/list,info/video/detail,info/video/list,service,faq,assets/directed/index,assets/directed/query,assets/directed/password,assets/portfolio/index,assets/portfolio/custom,assets/portfolio/basic'.split(',').forEach(createPage);

