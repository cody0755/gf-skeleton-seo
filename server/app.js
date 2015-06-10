var _ = require('lodash'),
    express = require('express'),
    swig = require('swig'),
    app = express();

require('./helpers/swig.js');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

var StaticOptions = {
    dotfiles: 'ignore',
    etag: true,
    index: false
};

if (process.env.NODE_ENV == 'production') {
    app.set('views', __dirname + '/../dist/views');
    app.use(express.static(__dirname+'/../dist', StaticOptions));
} else {
    app.set('view cache', false);
    app.set('views', __dirname + '/../frontend/views');
    swig.setDefaults({
        cache: false
    });
    app.use(express.static(__dirname+'/../frontend', StaticOptions));
}

/* Todo: optimize for target not wild match */
app.use(express.static(__dirname+'/../.tmp', StaticOptions));
// such as robots.txt, sitemap.xml
app.use(express.static(__dirname+'/root', StaticOptions));

/* async callback error handler */
// var domainHandler = require('./helpers/domain-middleware');
// app.use(domainHandler.Handler());

require('./routers')(app);

/* last rescure - log it */
app.use(function(err, req, res, next) {
    /*logger.error({
        req: req,
        text: 'not found ' + req.getUrl()
    });*/
    res.render('404.html');
});

var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('snaptube web app listening at http://%s:%s', host, port);
});
