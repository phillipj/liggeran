var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8090);

server.views({
    engines: {
        html: 'handlebars',
    },
    path: './views',
    partialsPath: './views/partials',
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './public', listing: false, index: true }
    }
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		reply.view('main');
	}
});

server.start();
