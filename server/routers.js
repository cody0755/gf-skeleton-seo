
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
fs.readdirSync(__dirname+'/controllers').forEach(function(controllerName) {
    require('./controllers/' + controllerName)(routes);
});

module.exports = function(app) {
    app.serveMaps = function(map) {
        // forEach map, split key with method and path
    };

    urlMaps = {
        'GET /': routes.home,
        'GET /users/:name': routes.getUserbyName,
        'POST /users/:name': routes.updateUser
    };


    app.get('/', routes.home);
    app.get('/example1', routes.example1);

    ['about', 'faq', 'contact', 'youtube-downloader-installation', 'privacy', 'terms'].forEach(function(page) {
        app.get('/'+page, routes.pagify(page));
    });

    app.serveMaps(urlMaps);
    app.get('*', function(req, res, next) {
        if(fs.existsSync('../frontend/views'+req.path+'.html')) {
            res.render(req.path.slice(1));
        } else {
            next();
        }
    });
};

