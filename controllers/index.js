const router = require('express').Router();

const homeRoute = require('./home-route');
const apiRoutes = require('./api');

router.use('/', homeRoute);
router.use('/api', apiRoutes);

module.exports = router;