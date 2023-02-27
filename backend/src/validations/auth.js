const Joi = require('@hapi/joi');
const { password } = require('./custom');

const register = {
  body: Joi.object().keys({
    userId: Joi.string().required().label('User Id'),
    password: Joi.string().max(14).required().custom(password).label('Password'),
    fullName: Joi.string().required().label('Full Name'),
  }),
};

const login = {
  body: Joi.object().keys({
    userId: Joi.string().required().label('User Id'),
    password: Joi.string().max(14).required().custom(password).label('Password'),
  }),
};

module.exports = {
  register,
  login,
};
