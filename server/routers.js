
var fs = require('fs');
var _ = require('lodash');

// function batchImportFn(dir) {
//     var code = '';
//     /*fs.readdirSync(__dirname+'/controllers').forEach((name)=>{
//         mod = _.camelCase(name);
//         `import * as ${mod} from './controllers/${name}'`;
//     });*/
//     code = _.reduce(fs.readdirSync(dir), (code, name)=> {
//         mod = _.camelCase(name);
//         code + `import * as ${mod} from './controllers/${name}'`;
//     }, '');
//     eval(code);
// }

// batchImportFn(__dirname+'/controllers')

// console.log(this);

var routes = {};
// pull in all the controllers (these contain routes)
/*fs.readdirSync(__dirname+'/controllers').forEach(function(controllerName) {
    require('./controllers/' + controllerName)(routes);
});*/

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    // info/audio/list -> info/audio/list.js
    // info/audio/detail/:id -> info/audio/detail.j
    app.get('*', function(req, res, next) {
        if(fs.existsSync(__dirname+'/../frontend/views'+req.path+'.html')) {
            res.render(req.path.slice(1));
        } else {
            next();
        }
    });
};

