var Joi = require('joi');
module.exports = {
  firstName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(200),
  companyEmail: Joi.string().email(),
  privateEmail: Joi.string().email()
};
