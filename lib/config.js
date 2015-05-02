var convict = require('convict');

var conf = convict({
	env: {
		doc: 'Application enviroments',
		format: ['production', 'development'],
		default: 'development',
		env: 'NODE_ENV'
	},
	port: {
		doc: 'Port to bind',
		format: 'port',
		default: 8000,
		env: 'PORT'
	},
	email: {
		server: {
			'api-key': {
				doc: 'Email server API key',
				default: '',
				ENV: 'MANDRILL_API_KEY'
			}
		}
	},
	serverOptions: {
		doc: 'Hapi server options to pass in',
		format: Object,
		default: {}
	}
});

var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

conf.validate();

module.exports = conf;
