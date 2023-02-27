const config = require('./config');

module.exports = {
  auth: {
    signUp: `${config.bppUrl}/api/signup`,
    login: `${config.bppUrl}/api/token`,
  },
  scheme: {
    create: `${config.bppUrl}/api/scheme/create`,
    all: `${config.bppUrl}/api/scheme/list`,
    byId: `${config.bppUrl}/api/scheme`,
    publish: `${config.bppUrl}/api/scheme/publish`,
    unpublish: `${config.bppUrl}/api/scheme/unpublish`,
    delete: `${config.bppUrl}/api/scheme/delete`,
    update: `${config.bppUrl}/api/scheme/update`,
  },
  provider: {
    create: `${config.bppUrl}/api/scheme/provider/add`,
    update: `${config.bppUrl}/api/scheme/provider/update`,
    delete: `${config.bppUrl}/api/scheme/provider/delete`,
    all: `${config.bppUrl}/api/scheme/provider/list`,
    byId: `${config.bppUrl}/api/scheme/provider`,
  },
  applicant: {
    award: `${config.bppUrl}/api/app/award`,
    reject: `${config.bppUrl}/api/app/reject`,
    all: `${config.bppUrl}/api/app/list`,
    byId: `${config.bppUrl}/api/app`,
  },
};
