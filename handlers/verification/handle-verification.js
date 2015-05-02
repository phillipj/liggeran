var i18n = require('../../lib/i18nConfig');
module.exports = function(request, reply){
  reply.view('verification/wait', {
    page: {
      title: i18n.__('verification_page_title')
    }
  });
};
