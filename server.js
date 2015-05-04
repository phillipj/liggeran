var Hapi = require('hapi');
var fs = require('fs');
var i18n = require('./lib/i18nConfig');
var config = require('./lib/config');

var hapiOptions = {
  debug: {
    request: ['debug'],
    log: ['debug']
  }
};

if (config.get('tls')){
    console.log('configuring TLS');
    hapiOptions.tls = {
      ca: fs.readFileSync('ca.pem'),
      key: fs.readFileSync('liggeran-ssl-private.key'),
      cert: fs.readFileSync('liggeran-ssl.crt')
    };
}

var server = new Hapi.Server(hapiOptions);

var hbs = require('handlebars');
hbs.registerHelper('__', function (key) {
    return i18n.__(key);
});
hbs.registerHelper('__n', function () {
    return i18n.__n.apply(this, arguments);
});

var serverConnection = server.connection({
  port: config.get('port'),
  router: {
    stripTrailingSlash: true
  }
});

server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: [{
        log: '*',
        response: '*',
        error: '*',
        request: '*',
        ops: '*'
      }]
    }]
  }
}, function(err){
  if (err) {
    throw err;
  }
  server.log('debug', 'I am running');
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

serverConnection.register(require('./plugins/liggeran-email'), function(err) {
  if (err) {
    server.log('error', err);
    throw err;
  }
  server.log('debug', 'Started email');
});

server.start(function () {
    console.info('Server started..' + server.info.uri);
});
