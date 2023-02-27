const axios = require('axios');
const _ = require('lodash');
const { BAD_REQUEST, OK } = require('http-status');
const { bppUrls } = require('../config');
const { catchAsync } = require('../utils');

const createScheme = catchAsync(async (req, res) => {
  try {
    const { body, headers } = req;

    const { authorization } = headers;

    const scheme = await axios.post(bppUrls.scheme.create, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      message: 'Scheme created successfully',
      ...scheme.data,
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

const getAllScheme = catchAsync(async (req, res) => {
  try {
    const { headers } = req;

    const { authorization } = headers;

    const scheme = await axios.get(bppUrls.scheme.all, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      ...scheme.data,
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

const getSchemeById = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { schemeId } = params;

    const { authorization } = headers;

    const scheme = await axios.get(`${bppUrls.scheme.byId}/${schemeId}`, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      ...scheme.data,
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

const schemePublish = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { schemeId } = params;

    const { authorization } = headers;

    const scheme = await axios.post(
      `${bppUrls.scheme.publish}/${schemeId}`,
      {},
      {
        headers: {
          authorization,
        },
      },
    );

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      message: 'Scheme published successfully',
      ...scheme.data,
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

const schemeUnpublish = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { schemeId } = params;

    const { authorization } = headers;

    const scheme = await axios.post(
      `${bppUrls.scheme.unpublish}/${schemeId}`,
      {},
      {
        headers: {
          authorization,
        },
      },
    );

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      message: 'Scheme unpublished successfully',
      ...scheme.data,
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

const deleteScheme = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { schemeId } = params;

    const { authorization } = headers;

    const scheme = await axios.post(
      `${bppUrls.scheme.delete}/${schemeId}`,
      {},
      {
        headers: {
          authorization,
        },
      },
    );

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      message: 'Scheme deleted successfully',
      ...scheme.data,
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

const updateScheme = catchAsync(async (req, res) => {
  try {
    const { body, params, headers } = req;

    const { schemeId } = params;

    const { authorization } = headers;

    const scheme = await axios.post(`${bppUrls.scheme.update}/${schemeId}`, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(scheme, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...scheme.data,
      };
    }

    res.status(OK).send({
      message: 'Scheme updated successfully',
      ...scheme.data,
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
  createScheme,
  getAllScheme,
  getSchemeById,
  schemePublish,
  schemeUnpublish,
  deleteScheme,
  updateScheme,
};
