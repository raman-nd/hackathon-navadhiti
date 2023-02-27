const axios = require('axios');
const _ = require('lodash');
const { BAD_REQUEST, OK } = require('http-status');
const { bppUrls } = require('../config');
const { catchAsync } = require('../utils');

const awardApplicant = catchAsync(async (req, res) => {
  try {
    const { body, params, headers } = req;

    const { applicantId } = params;

    const { authorization } = headers;

    const applicant = await axios.post(`${bppUrls.applicant.award}/${applicantId}`, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(applicant, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...applicant.data,
      };
    }

    res.status(OK).send({
      message: 'Application awarded successfully',
      ...applicant.data,
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

const rejectApplicant = catchAsync(async (req, res) => {
  try {
    const { body, params, headers } = req;

    const { applicantId } = params;

    const { authorization } = headers;

    const applicant = await axios.post(`${bppUrls.applicant.reject}/${applicantId}`, body, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(applicant, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...applicant.data,
      };
    }

    res.status(OK).send({
      message: 'Application rejected successfully',
      ...applicant.data,
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

const getApplicantById = catchAsync(async (req, res) => {
  try {
    const { params, headers } = req;

    const { applicantId } = params;

    const { authorization } = headers;

    const applicant = await axios.get(`${bppUrls.applicant.byId}/${applicantId}`, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(applicant, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...applicant.data,
      };
    }

    res.status(OK).send({
      ...applicant.data,
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

const getAllApplicant = catchAsync(async (req, res) => {
  try {
    const { headers } = req;

    const { authorization } = headers;

    const applicant = await axios.get(`${bppUrls.applicant.all}`, {
      headers: {
        authorization,
      },
    });

    if (_.isEqual(_.get(applicant, 'data.status'), 'FAILED')) {
      throw {
        statusCode: BAD_REQUEST,
        ...applicant.data,
      };
    }

    res.status(OK).send({
      ...applicant.data,
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
  awardApplicant,
  rejectApplicant,
  getApplicantById,
  getAllApplicant,
};
