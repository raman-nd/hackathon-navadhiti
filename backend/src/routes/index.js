const express = require('express');
const { OK } = require('http-status');
const applicantRoute = require('./applicant');
const authRoute = require('./auth');
const providerRoute = require('./provider');
const schemeRoute = require('./scheme');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(OK).send('Welcome to hackathon');
});

router.use('/applicant', applicantRoute);

router.use('/auth', authRoute);

router.use('/provider', providerRoute);

router.use('/scheme', schemeRoute);

module.exports = router;
