var _ = require('lodash'),
    express = require('express'),
    swig = require('swig'),
    app = express();

// require('./helpers/swig-extend.js');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

if (process.env.NODE_ENV == 'production') {
    app.set('views', __dirname + '/../dist/views');
    // require('newrelic');
} else {
    app.set('view cache', false);
    app.set('views', __dirname + '/../frontend/views');
    swig.setDefaults({
        cache: false
    });
}

/* Baic Prepare: inject locals, assetmanager etc */
// var baseModule = require('./modules/base');
// baseModule.bootstrap(app);
// var logger = baseModule.getLogger();

/* Static and root file serves */
var StaticOptions = {
    dotfiles: 'ignore',
    etag: true,
    index: false
};

/* Todo: optimize for target not wild match */
app.use(express.static(__dirname+'/../dist', StaticOptions));
app.use(express.static(__dirname+'/../.tmp', StaticOptions));
app.use(express.static(__dirname+'/../frontend', StaticOptions));
app.use(express.static(__dirname+'/root', StaticOptions)); // such as robots.txt, sitemap.xml

/* async callback error handler */
// var domainHandler = require('./helpers/domain-middleware');
// app.use(domainHandler.Handler());

/* Simple Page with layout and support SPF */
/*var pageModule = require('./modules/pages');
pageModule.serve(['about', 'faq', 'contact', 'youtube-downloader-installation', 'privacy', 'terms'], app);*/

/* empty handler? 404 it */
/* last rescure - log it */
app.use(function(err, req, res, next) {
    /*logger.error({
        req: req,
        text: 'not found ' + req.getUrl()
    });*/
    res.render('404.html');
});

/*process.on('uncaughtException', function(err) {
    console.log('uncaughtException caught the error');
});*/

var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('snaptube web app listening at http://%s:%s', host, port);
});

require('./routers')(app);
