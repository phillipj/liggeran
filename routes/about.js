var i18n = require('../lib/i18nConfig');

module.exports = {
	handler: function(request, reply){
        reply.view('about', {
            page: {
                title: i18n.__('about_page_title')
            }
        });
    }
};