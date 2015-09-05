exports.register = function(server, options, next) {
  server.log('debug', 'Initializing user plugin');
  var userService = require('./user/service');
  userService.setDburl(options.dburl);
  server.method('service.user.create', userService.create);
  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
