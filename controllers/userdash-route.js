const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { search } = require('../utils/giphy-api');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try { 
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id},
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
        res.render('user-dash', { posts, loggedIn: true});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/edit/:id', withAuth, async (req, res) => {
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
        res.render('edit-post', { posts, loggedIn: true});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/new', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.params.user_id },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                  }
                },
                {
                  model: User,
                  attributes: ['username', 'twitter', 'github']
                }
              ]
        });
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('new-post', { posts, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;