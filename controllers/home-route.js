const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { search } = require('../utils/giphy-api');

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

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

router.get('/giphySearch', async (req, res) => {
    try {
        res.render('giphySearch');
    } catch (err) {
        res.status(500).json(err);
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
        res.render('homepage', {
            giphyData
        });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
