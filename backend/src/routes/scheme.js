const express = require('express');
const { validate } = require('../middlewares');
const { schemeValidation } = require('../validations');
const { schemeController } = require('../controllers');

const router = express.Router();

router.post('/create', validate(schemeValidation.createScheme), schemeController.createScheme);

router.get('/all', validate(schemeValidation.getAllScheme), schemeController.getAllScheme);

router.get('/:schemeId', validate(schemeValidation.getSchemeById), schemeController.getSchemeById);

router.get('/publish/:schemeId', validate(schemeValidation.schemePublish), schemeController.schemePublish);

router.get('/unpublish/:schemeId', validate(schemeValidation.schemeUnpublish), schemeController.schemeUnpublish);

router.delete('/:schemeId', validate(schemeValidation.deleteScheme), schemeController.deleteScheme);

router.put('/:schemeId', validate(schemeValidation.updateScheme), schemeController.updateScheme);

module.exports = router;
