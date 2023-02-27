const axios = require('axios');
const _ = require('lodash');
const { BAD_REQUEST, OK } = require('http-status');
const { bppUrls } = require('../config');
const { catchAsync } = require('../utils');

const createProvider = catchAsync(async (req, res) => {
  try {
    const { body, headers } = req;

    const { authorization } = headers;

    const provider = await axios.post(bppUrls.provider.create, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(provider, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...provider.data,
      };
    }

    res.status(OK).send({
      message: 'Provider created successfully',
      ...provider.data,
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

const getAllProvider = catchAsync(async (req, res) => {
  try {
    const { headers } = req;

    const { authorization } = headers;

    const provider = await axios.get(bppUrls.provider.all, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(provider, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...provider.data,
      };
    }

    res.status(OK).send({
      ...provider.data,
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

const getProviderById = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { providerId } = params;

    const { authorization } = headers;

    const provider = await axios.get(`${bppUrls.provider.byId}/${providerId}`, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(provider, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...provider.data,
      };
    }

    res.status(OK).send({
      ...provider.data,
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

const deleteProvider = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { providerId } = params;

    const { authorization } = headers;

    const provider = await axios.post(
      `${bppUrls.provider.delete}/${providerId}`,
      {},
      {
        headers: {
          authorization,
        },
      },
    );

    if (_.isEqual(_.get(provider, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...provider.data,
      };
    }

    res.status(OK).send({
      message: 'Provider deleted successfully',
      ...provider.data,
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

const updateProvider = catchAsync(async (req, res) => {
  try {
    const { body, params, headers } = req;

    const { providerId } = params;

    const { authorization } = headers;

    const provider = await axios.post(`${bppUrls.provider.update}/${providerId}`, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(provider, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...provider.data,
      };
    }

    res.status(OK).send({
      message: 'Provider updated successfully',
      ...provider.data,
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

module.exports = {
  createProvider,
  getAllProvider,
  getProviderById,
  deleteProvider,
  updateProvider,
};
