var fs = require('fs');
var i18n = require('../lib/i18nConfig');
var Joi = require('joi');

function setLocale(locale){
  i18n.setLocale(locale);
}

setLocale('no');

module.exports = function(server){
	var routes = [{
    method: 'GET',
    path: '/about',
    config: {
      handler: function(request, reply){
        reply.view('about', {
          page: {
            title: i18n.__('about_page_title')
          }
        });
      }
    }
  }, {
		method: 'GET',
		path: '/verify',
		config: {
			handler: require('../handlers/verification/show-verify-form')
		}
	}, {
		method: ['POST'],
		path: '/verify',
		config: {
			handler: require('../handlers/verification/show-verify-form'),
			validate: {
        options: {
          abortEarly: false
        },
				payload: {
					privateEmail: Joi.string().email(),
					workEmail: Joi.string().email()
				},
        failAction: function(request, reply, source, error){
          //console.log('debug,error', ['Validattion error', error]);
          request.validationError = error;
          reply.continue();
        }
			}
		}
	}, {
    method: 'POST',
    path: '/register',
    config: {
      handler: function(request, reply){
        request.log(['registering salary']);
        console.log('handler...');
        reply('success');
      },
      validate: {
        query: {
          workEmail: Joi.string().min(5).max(100)
        }
      }
		}
	}, {
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      if (request.query.locale != null){
        setLocale(request.query.locale);
      }
      reply.view('main', {
        page: {
          title: i18n.__('main_page_title')
        }
      }, {layout: 'empty'});
    }
	}];
	var routeOptions = {
    authConfig: {},
    payloadConfig: {}
  };

  fs.readdirSync(__dirname).filter(function(file) {
		return file !== 'index.js';
  }).map(function(file) {
    server.route(require('./' + file)(server, routeOptions));
  });
	return routes;
};
