var mandrill = require('mandrill-api/mandrill');
var mqtt = require('mqtt');
var internals = {
  options: {}
};

var mqClient = mqtt.connect('mqtt://localhost');
mqClient.on('connect', function() {
  mqClient.subscribe('registered');
});

mqClient.on('message', function(topic, message) {
  var user = JSON.parse(message.toString());
  console.log(user);
  internals.send({
    to: user.privateemail,
    from: user.companyemail
  }, function() {});
});

internals.send = function(options, callback) {
  var Hoek = require('hoek');
  var Joi = require('joi');

  var schema = Joi.object().keys({
    to: Joi.string().email().required(),
    from: Joi.string().email().required()
  });
  Joi.validate(options, schema, function(err) {
    console.log(err);
    Hoek.assert(!err && err == null);
  });
  var content = {};
  var key = internals.options.apikey;
  var client = new mandrill.Mandrill(key);

  var sendOptions = {
    template_name: 'verify_email',
    template_content: [],
    message: {
      global_merge_vars: content,
      html: options.text,
      text: options.text,
      subject: options.subject,
      from_email: options.from,
      to: [{
        email: options.to
      }],
      important: 'true'
    }
  };
  client.messages.sendTemplate(sendOptions, function(result) {
    callback(null, result);
  }, function(err) {
    if (err) {
      console.log(err);
      callback(err);
    }
  });
};
exports.register = function(server, options, next) {
  server.log('info', 'Creating email plugin');
  internals.options.apikeu = options.apikey;

  server.method('service.email.send', internals.send);

  next();
};
exports.register.attributes = {
  pkg: require('../package.json')
};
