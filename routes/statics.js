module.exports = function(){
	return [{
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: { path: './public', listing: false, index: true }
    }
	}, {
		method: 'GET',
		path: '/css/spaden/{path*}',
		handler: {
			directory: { path: './node_modules/spaden/dist/spaden-2.0.9/', listing: false, index: true }
		}
	}];
};
