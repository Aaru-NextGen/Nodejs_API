const Joi = require('@hapi/joi');
const constants = require('../constants');


const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data);
  if (result.error) {
    const errorDetails = result.error.details.map(value => {
      return {
        error: value.message,
        path: value.path
      };
    });
    return errorDetails;
  }
  return null;
}

module.exports.validateBody = (schema) => {
    console.log("Trying to validate");
    return (req, res, next) => {
      let response = { ...constants.defaultServerResponse };
      const error = validateObjectSchema(req.body, schema);
      if (error) {
        response.body = error;
        response.message = constants.requestValidationMessage.BAD_REQUEST;
        return res.status(response.status).send(response);
      }
      return next();
    }
  }