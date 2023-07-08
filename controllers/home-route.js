const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const sequelize = require('../config/connection');
const { search } = require('../utils/giphy-api');

router.get('/', async (req, res) => {
    try { 
        const dbPostData = await Post.findAll({
            attributes: ['id', 'model', 'issue', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try { 
        const dbPostData = await Post.findOne({
            where: { id: req.params.id},
            attributes: ['id', 'model', 'issue', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });

        const posts = dbPostData.get({ plain: true});
        // console.log(posts);
        res.render('single-post', { posts, loggedIn: req.session.loggedIn });
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

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
  
    res.render('signup');
  });

router.get('/giphySearch', async (req, res) => {
    try {
        res.render('giphySearch');
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/homepage/:searchTerm', async (req, res) => {
    try {
        const response = await search(req.params.searchTerm);
        // console.log(JSON.stringify(response.data, null, 2));
        // console.log(response.data.data);
        let giphyData = response.data.data;
        giphyData = giphyData.map(imageItem => ({
            alt: imageItem.title,
            url: imageItem.images.fixed_height.url
        }));
        console.log(giphyData);
        res.render('giphy', {
            giphyData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
