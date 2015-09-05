var mandrill = require('mandrill-api/mandrill');

var internals ={};

internals.send = function(options, callback){
  var content = {};
  var key = process.env.MANDRILL_KEY;
  var mandrill = new mandrill.Mandrill(key);

  var sendOptions = {
    template_name: 'verify_email',
    template_content: [
    ],
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
  mandrill.messages.sendTemplate(sendOptions, function(result){
    callback(null, result);
  }, function(err){
    if (err){
      callback(err);
    }
  });
};
exports.register = function (server, options, next) {
  server.log('info', 'Creating email plugin');

  server.method('service.email.send', internals.send);

	next();
};
exports.register.attributes = {
    pkg: require('../package.json')
};
