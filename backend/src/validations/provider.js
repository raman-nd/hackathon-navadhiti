const Joi = require('@hapi/joi');

const createProvider = {
  body: Joi.object().keys({
    schemeProviderName: Joi.string().required().label('Scheme Provider Name'),
    schemeProviderDescription: Joi.string().required().label('Scheme Provider Description'),
    schemeProviderWebsite: Joi.string().required().label('Scheme Provider Website'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getAllProvider = {
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const getProviderById = {
  params: Joi.object().keys({
    providerId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const deleteProvider = {
  params: Joi.object().keys({
    providerId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

const updateProvider = {
  body: Joi.object().keys({
    schemeProviderName: Joi.string().required().label('Scheme Provider Name'),
    schemeProviderDescription: Joi.string().required().label('Scheme Provider Description'),
    schemeProviderWebsite: Joi.string().required().label('Scheme Provider Website'),
  }),
  params: Joi.object().keys({
    providerId: Joi.string().required().label('Scheme Id'),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().label('Authorization token'),
    })
    .unknown(true),
};

module.exports = {
  createProvider,
  getAllProvider,
  getProviderById,
  deleteProvider,
  updateProvider,
};
