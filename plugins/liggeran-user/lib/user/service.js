var Joi = require('joi');
var pg = require('pg');

var validation = require('./validation');
var internals = {
  dburl: ''
};

internals.setDburl = function(url){
  internals.dburl = url;
};

internals.create = function(options, callback){
  Joi.validate(options, validation, function(err){
    if (err) {
      callback(err);
    }
    var constring = internals.dburl;
    pg.connect(constring, function(connectionErr, client, done){
      if (connectionErr) {
        return connectionErr;
      }
      var uuid = require('uuid');
      var user = options;

      client.query('INSERT INTO profile (id, privateEmail, companyEmail) values (\''
        + uuid.v4() + '\', \''
        + user.privateEmail + '\', \''
        + user.companyEmail + '\') RETURNING *', function(err, result){
          done();
        if (err){
          return callback(err);
        }
        callback(null, result);
      });
    });
  });
};

module.exports = internals;
