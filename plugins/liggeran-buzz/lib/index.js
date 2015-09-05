exports.register = function(server, options, next) {
  server.log('debug', 'Initializing Buzz');

  var buzzServer = require('./server');
  buzzServer.initialize(options);
  buzzServer.start();
  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
