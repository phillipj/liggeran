var i18n = new (require('i18n-2'))({
    locales: ['no', 'en'],
    cookie: 'locale'
});

module.exports = {
	handler: function(request, reply){
        reply.view('about', {
            page: {
                title: i18n.__('about_page_title')
            }
        });
    }
};