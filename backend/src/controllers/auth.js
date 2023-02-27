const axios = require('axios');
const _ = require('lodash');
const { BAD_REQUEST, OK } = require('http-status');
const { bppUrls } = require('../config');
const { catchAsync } = require('../utils');

const register = catchAsync(async (req, res) => {
  try {
    const { body } = req;

    const createUser = await axios.post(bppUrls.auth.signUp, body);

    if (_.isEqual(_.get(createUser, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...createUser.data,
      };
    }

    res.status(OK).send({
      message: 'User created successfully',
      ...createUser.data,
    });
  } catch (err) {
    const error = err.message ? err : new Error(err);

    const code = _.get(err, 'response.status') ? _.get(err, 'response.status') : BAD_REQUEST;

    throw {
      statusCode: code,
      message: error.message,
    };
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { body } = req;

    const user = await axios.post(bppUrls.auth.login, body);

    res.status(OK).send(user.data);
  } catch (err) {
    const error = err.message ? err : new Error(err);

    const code = _.get(err, 'response.status') ? _.get(err, 'response.status') : BAD_REQUEST;

    throw {
      statusCode: code,
      message: error.message,
    };
  }
});

module.exports = {
  register,
  login,
};
