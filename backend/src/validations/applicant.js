const Joi = require('@hapi/joi');

const awardApplicant = {
  body: Joi.object().keys({
    remarks: Joi.string().required().label('Remarks'),
  }),
  params: Joi.object().keys({
    applicantId: Joi.string().required().label('Applicant Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const rejectApplicant = {
  body: Joi.object().keys({
    remarks: Joi.string().required().label('Remarks'),
  }),
  params: Joi.object().keys({
    applicantId: Joi.string().required().label('Applicant Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getApplicantById = {
  params: Joi.object().keys({
    applicantId: Joi.string().required().label('Applicant Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getAllApplicant = {
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

module.exports = {
  awardApplicant,
  rejectApplicant,
  getApplicantById,
  getAllApplicant,
};
