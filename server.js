var Hapi = require('hapi');
var Hoek = require('hoek');
var fs = require('fs');
var i18n = require('./lib/i18nConfig');
var config = require('./lib/config');

var hapiOptions = {
  debug: {
    request: ['*'],
    log: ['*']
  }
};

if (config.get('tls')) {
  console.log('configuring TLS');
  hapiOptions.tls = {
    ca: fs.readFileSync('ca.pem'),
    key: fs.readFileSync('liggeran-ssl-private.key'),
    cert: fs.readFileSync('liggeran-ssl.crt')
  };
}

var server = new Hapi.Server(hapiOptions);

var hbs = require('handlebars');
hbs.registerHelper('__', function(key) {
  return i18n.__(key);
});
hbs.registerHelper('__n', function() {
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
      events: {
        log: '*',
        request: '*',
        error: '*'
      }
    }]
  }
}, function(err) {
  if (err) {
    console.log('Error Initializing Good singnaling', err);
  }
});

server.register(require('vision'), function(err) {
  Hoek.assert(!err, err);
  server.views({
    engines: {
      html: {
        module: hbs,
        compileMode: 'sync'
      }
    },
    path: './views',
    /*  isCached: !development,*/
    partialsPath: './views/partials',
    /*helpersPath: './views/helper',*/
    layout: 'default',
    layoutPath: './views/templates',
  });
});

server.register(require('inert'), function(err) {
  Hoek.assert(!err, err);

  server.route([{
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: true
      }
    }
  }, {
    method: 'GET',
    path: '/css/spaden/{path*}',
    handler: {
      directory: {
        path: './node_modules/spaden/dist/',
        listing: false,
        index: true
      }
    }
  }]);
});

server.route(require('./routes/')(server));
var emailPlugin = require('./plugins/liggeran-email');
var userPlugin = require('./plugins/liggeran-user');

var buzz = require('./plugins/liggeran-buzz');

serverConnection.register([{
    register: buzz,
    options: {
      port: 1883
    }
  },
  emailPlugin, {
    register: userPlugin,
    options: {
      dburl: config.get('datastore.url')
    }
  }
], function(err) {
  if (err) {
    server.log('error', err);
    throw err;
  }
  server.log('debug', 'Started email');
});

server.start(function() {
  server.log('info', 'Server started..' + server.info.uri);
});
