var internals ={};

internals.send = function(options, callback){
  console.log('Sending', options);
  callback();
};
exports.register = function (server, options, next) {
  console.log('Creating email plugin');

  server.method('service.email.send', internals.send);
	next();
};
exports.register.attributes = {
    pkg: require('../package.json')
};
