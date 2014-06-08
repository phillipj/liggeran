var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
	method: 'get',
	path: '/',
	handler: function(request, reply){
		reply('hvordan ligger du an?');
	}
});

server.start();
