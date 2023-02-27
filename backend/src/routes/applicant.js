const express = require('express');
const { validate } = require('../middlewares');
const { applicantValidation } = require('../validations');
const { applicantController } = require('../controllers');

const router = express.Router();

router.post('/award/:applicantId', validate(applicantValidation.awardApplicant), applicantController.awardApplicant);

router.post('/reject/:applicantId', validate(applicantValidation.rejectApplicant), applicantController.rejectApplicant);

router.get('/all', validate(applicantValidation.getAllApplicant), applicantController.getAllApplicant);

router.get('/:applicantId', validate(applicantValidation.getApplicantById), applicantController.getApplicantById);

module.exports = router;
