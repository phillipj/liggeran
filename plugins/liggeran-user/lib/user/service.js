var Joi = require('joi');
var pg = require('pg');
var mqtt = require('mqtt');

var validation = require('./validation');
var internals = {
  dburl: ''
};

internals.setDburl = function(url) {
  internals.dburl = url;
};

internals.create = function(options, callback) {
  Joi.validate(options, validation, function(err) {
    if (err) {
      callback(err);
    }
    var mqClient = mqtt.connect('mqtt://localhost');

    var constring = internals.dburl;
    pg.connect(constring, function(connectionErr, client, done) {
      if (connectionErr) {
        return connectionErr;
      }
      var uuid = require('uuid');
      var user = options;

      client.query(
        'INSERT INTO profile (id, privateEmail, companyEmail) values (\'' +
        uuid.v4() + '\', \'' + user.privateEmail + '\', \'' + user.companyEmail +
        '\') RETURNING *',
        function(err, result) {
          done();
          if (err) {
            return callback(err);
          }
          var profile = result.rows.shift();
          mqClient.publish('registered', JSON.stringify(profile));
          mqClient.end();
          callback(null, profile);
        });
    });
  });
};

module.exports = internals;
