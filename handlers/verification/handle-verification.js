var i18n = require('../../lib/i18nConfig');

module.exports = function(request, reply){
  var options = {
    from: request.payload.privateEmail,
    to: request.payload.workEmail,
    text: 'Hei sveis',
    subject: 'yo'
  };
  request.server.methods.service.email.send(options, function(err, result){
    if (err){
      request.log('error', ['Send mail error', err]);
      throw err;
    }
    request.log('debug', result);
    reply.view('verification/wait', {
      page: {
        title: i18n.__('verification_page_title')
      }
    });
  });

};
