const Joi = require('@hapi/joi');

module.exports.login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});
    