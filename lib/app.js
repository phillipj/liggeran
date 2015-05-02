var Hapi = require('hapi');
var fs = require('fs');
var i18n = require('./i18nConfig');
var config = require('./config');

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
/*  isCached: !development,*/
  partialsPath: './views/partials',
  /*helpersPath: './views/helper',*/
  layoutPath: './views/templates',
  layout: 'default',
  compileMode: 'sync'
});


server.route(require('./routes/')(server));


server.start(function () {
    console.log('server started on ' + server._host + ':' + server._port);
});
