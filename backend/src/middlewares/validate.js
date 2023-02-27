const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const { ApiError, pick } = require('../utils');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['headers', 'params', 'query', 'body']);

  const object = pick(req, Object.keys(validSchema));

  if (schema.headers) {
    const { headers } = req;

    object.headers = headers;
  }

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');

    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);

  return next();
};

module.exports = validate;
