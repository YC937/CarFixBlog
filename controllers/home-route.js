const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/upload', async (req, res) => {
    try {
        res.render('upload');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});



module.exports = router;
