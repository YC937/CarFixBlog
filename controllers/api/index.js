const router = require('express').Router();


const postRoutes = require ('./post-route');
const userRoutes = require ('./user-route');


router.use('/', postRoutes);
router.use('/', userRoutes);

module.exports = router;