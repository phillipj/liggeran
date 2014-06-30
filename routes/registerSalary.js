var joi = require('joi');

var registerSalaryConfig = {
	handler: function(request, reply){
		request.log(['registering salary']);
        console.log('handler...');
    },
    validate: {
    	query: {
    		workEmail: joi.string().max(100)
    	}
    }
};
module.exports = registerSalaryConfig;
