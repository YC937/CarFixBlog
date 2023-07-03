const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { search } = require('../utils/giphy-api');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try { 
        const dbPostData = await Post.findAll({
            attributes: ['id', 'place', 'description', 'created_at'],
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
        res.render('user-dash', { posts});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/edit/:id', async (req, res) => {
    try { 
        const dbPostData = await Post.findOne({
            where: { id: req.params,id },
            attributes: ['id', 'place', 'description', 'created_at'],
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
        res.render('edit-post', { posts});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;