const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth') 

router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            model: req.body.model,
            issue: req.body.issue,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(newPost);
    } catch(err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update(
            {
                model: req.body.model,
                issue: req.body.issue,
            },
            {
                where: { id: req.params.id }
            }
        )
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(dbPostData);

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id:req.session.user_id,
            },
        });
        
        if(!postData) {
            res.status(404).json({ message: 'No post found!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;