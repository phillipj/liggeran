var Hapi = require('hapi');
var i18n = new (require('i18n-2'))({
    locales: ['no', 'en'],
    cookie: 'locale'
});

function setLocale(locale){
    i18n.setLocale(locale);
}

setLocale('no');

var server = Hapi.createServer('', process.env.PORT || 8090);

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
    handler: function(request, reply){
        reply.view('about', {
            page: {
                title: i18n.__('about_page_title')
            }
        });
    }
})
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
