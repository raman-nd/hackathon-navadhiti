const Joi = require('@hapi/joi');

const acadDtl = Joi.object().keys({
  courseLevelID: Joi.string().required().label('Course Level Id'),
  courseLevelName: Joi.string().required().label('Course Level Name'),
  courseName: Joi.string().required().label('Course Name'),
  scoreType: Joi.string().required().label('Score Type'),
  scoreValue: Joi.number().integer().required().label('Score Value'),
  passingYear: Joi.string().required().label('Passing Year'),
});

const acadDtls = Joi.array().required().items(acadDtl);

const createScheme = {
  body: Joi.object().keys({
    schemeName: Joi.string().required().label('Scheme Name'),
    schemeDescription: Joi.string().required().label('Scheme Description'),
    schemeType: Joi.string().required().label('Scheme Type'),
    schemeFor: Joi.string().required().label('Scheme For'),
    financialYear: Joi.string().required().label('Financial Year'),
    schemeAmount: Joi.number().integer().required().label('Scheme Amount'),
    startDate: Joi.string().required().label('Start Date'),
    endDate: Joi.string().required().label('End Date'),
    eligibility: Joi.object()
      .keys({
        acadDtls: acadDtls,
        gender: Joi.string().required().label('Gender'),
        familyIncome: Joi.string().required().label('Family Income'),
      })
      .label('Eligibility'),
    addtnlInfoReq: Joi.boolean().label('Additional Infomation'),
    spocName: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Spoc Name'),
    spocEmail: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Spoc Email'),
    helpdeskNo: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Help Desk Number'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getAllScheme = {
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getSchemeById = {
  params: Joi.object().keys({
    schemeId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const schemePublish = {
  params: Joi.object().keys({
    schemeId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const schemeUnpublish = {
  params: Joi.object().keys({
    schemeId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const deleteScheme = {
  params: Joi.object().keys({
    schemeId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const updateScheme = {
  body: Joi.object().keys({
    schemeName: Joi.string().required().label('Scheme Name'),
    schemeDescription: Joi.string().required().label('Scheme Description'),
    schemeType: Joi.string().required().label('Scheme Type'),
    schemeFor: Joi.string().required().label('Scheme For'),
    financialYear: Joi.string().required().label('Financial Year'),
    schemeAmount: Joi.number().integer().required().label('Scheme Amount'),
    startDate: Joi.string().required().label('Start Date'),
    endDate: Joi.string().required().label('End Date'),
    eligibility: Joi.object()
      .keys({
        acadDtls: acadDtls,
        gender: Joi.string().required().label('Gender'),
        familyIncome: Joi.string().required().label('Family Income'),
      })
      .label('Eligibility'),
    addtnlInfoReq: Joi.boolean().label('Additional Infomation'),
    spocName: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Spoc Name'),
    spocEmail: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Spoc Email'),
    helpdeskNo: Joi.string()
      .when('addtnlInfoReq', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      })
      .label('Help Desk Number'),
    createdAt: Joi.string().required().label('Created At'),
  }),
  params: Joi.object().keys({
    schemeId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

module.exports = {
  createScheme,
  getAllScheme,
  getSchemeById,
  schemePublish,
  schemeUnpublish,
  deleteScheme,
  updateScheme,
};
