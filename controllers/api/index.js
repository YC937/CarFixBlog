const router = require('express').Router();


const postRoutes = require ('./post-route');
const userRoutes = require ('./user-route');
const commentRoutes = require('./comment-route');
const imageRoutes = require ('./image-route');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/images', imageRoutes);


module.exports = router;