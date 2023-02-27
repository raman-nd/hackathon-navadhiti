const express = require('express');
const { validate } = require('../middlewares');
const { providerValidation } = require('../validations');
const { providerController } = require('../controllers');

const router = express.Router();

router.post('/create', validate(providerValidation.createProvider), providerController.createProvider);

router.get('/all', validate(providerValidation.getAllProvider), providerController.getAllProvider);

router.get('/:providerId', validate(providerValidation.getProviderById), providerController.getProviderById);

router.delete('/:providerId', validate(providerValidation.deleteProvider), providerController.deleteProvider);

router.put('/:providerId', validate(providerValidation.updateProvider), providerController.updateProvider);

module.exports = router;
