const constants = require('../constants');
const jwt = require('jsonwebtoken');

const validateUserToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY || 'user-secret-key');
    console.log('decoded', decoded);
    return next();
  } catch (error) {
    console.log('Error', error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
}

const validateAdminToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    // console.log('decoded', decoded);
    return next();
  } catch (error) {
    console.log('Error', error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
}

module.exports = {
    validateAdminToken: validateAdminToken,
    validateUserToken: validateUserToken
}