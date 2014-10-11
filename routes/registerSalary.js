var joi = require('joi');

var registerSalaryConfig = {
    handler: function(request, reply){
        request.log(['registering salary']);
        console.log('handler...');
        reply('success');
    },
    validate: {
        query: {
            workEmail: joi.string().min(5).max(100)
        }
    }
};
module.exports = registerSalaryConfig;
