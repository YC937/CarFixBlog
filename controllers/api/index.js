const router = require('express').Router();

const apiRoutes = require ('./api');
const postRoutes = require ('./post-route');
const userRoutes = require ('./user-route');

router.use('/', apiRoutes);
router.use('/', postRoutes);
router.use('/', userRoutes);

module.exports = router;