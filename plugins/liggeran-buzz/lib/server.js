var mosca = require('mosca');

var internals = {};

internals.initialize = function(options) {
  internals.options = options;
};

internals.start = function() {
  console.log('mosca: starting...mosca');
  var settings = {
    port: internals.options.port,
  };

  var server = new mosca.Server(settings);
  server.on('clientConnected', function(client) {
    console.log('mosca: client connected', client.id);
  });

  server.on('published', function(packet /*, client*/ ) {
    console.log('mosca: Published', packet.payload);
  });

  server.on('ready', function setup() {
    console.log('mosca: Mosca server is up and running');
  });
};

module.exports = internals;
