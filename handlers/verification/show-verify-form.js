var i18n = require('../../lib/i18nConfig');
module.exports = function(request, reply){
  var context = {};
  request.log('debug', 'tess');
  if (request.validationError){
    request.log('error', 'has errors' + request.validationError);
    context.validationError = request.validationError;
  } else if (request.method === 'post') {
    var options = {
      privateEmail: request.payload.privateEmail,
      companyEmail: request.payload.workEmail
    };
    request.server.methods.service.user.create(options, function(err, result){
      if (err){
        request.log('error',['Error creating user', err]);
        return reply(err);
      }
      request.log('debug', ['User', result]);
      return reply.view('verification/wait', {
        page:{
          title: i18n.__('verification_page_title')
        }
      }, context);
    });
  }
  if (request.method === 'get'){
    reply.view('verification/register', {
      page: {
        title: i18n.__('verification_page_title')
      }
    }, context);
  }
};
