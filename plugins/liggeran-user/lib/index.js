var Joi = require('joi');
var validation = require('./user/validation');
var internals = {};

internals.create = function(options, callback){
  Joi.validate(options, validation, function(err){
    if (err) {
      callback(err);
    }
    var user = options;
    callback(null, user);
  });
};

exports.register = function (server, options, next) {
  server.log('debug', 'Initializing user plugin');
  server.method('service.user.create', internals.create);
	next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
