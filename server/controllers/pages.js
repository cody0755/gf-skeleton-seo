var fs = require('fs'),
    swig = require('swig'),
    _ = require('lodash'),
    DIR = __dirname + '/../../frontend/views/pages/',
    pageWrapTpl = fs.readFileSync(DIR + '_wrap.html', 'utf8');

var tpls = {};
module.exports = function(routes) {
    routes.pagify = function(page) {
        tpls[page] = fs.readFileSync(DIR + page + '.html', 'utf8');
        return function(req, res, next) {
            res.send(swig.render(pageWrapTpl.replace('###PLACEHOLDER###', tpls[page]), {
                locals: _.extend({}, {
                    // title, desc, etc
                }, res.locals),
                filename: DIR + page + '.html' // MAKE include/extend/import work
            }));
        }
    }
};