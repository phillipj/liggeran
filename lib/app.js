var Hapi = require('hapi');
var fs = require('fs');
var i18n = require('./i18nConfig');
var config = require('./config');

function setLocale(locale){
    i18n.setLocale(locale);
}

setLocale('no');

if (config.get('tls')){
    console.log('configuring TLS');
    config.load({
        serverOptions: {
            tls: {
                ca: fs.readFileSync('ca.pem'),
                key: fs.readFileSync('liggeran-ssl-private.key'),
                cert: fs.readFileSync('liggeran-ssl.crt')
            }
        }
    });
}

var server = Hapi.createServer('', config.get('port'), config.get('serverOptions'));

var hbs = require('handlebars');
hbs.registerHelper('__', function (key) {
    return i18n.__(key);
});
hbs.registerHelper('__n', function () {
    return i18n.__n.apply(this, arguments);
});


server.views({
    engines: {
        html: hbs
    },
    path: './views',
    partialsPath: './views/partials'
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: false, index: true }
    }
});

server.route({
    method: 'GET',
    path: '/about',
    config: require('../routes/about')
});

server.route({
    method: 'POST',
    path: '/register',
    config: require('../routes/registerSalary')
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        if (request.query.locale != null){
            setLocale(request.query.locale);
        }
        reply.view('main', {
            page: {
                title: i18n.__('main_page_title')
            }
        });
    }
});

server.start(function () {
    console.log('server started on ' + server._host + ':' + server._port);
});
