const router = require('express').Router();

const { User, Post, Comment} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: {exclude:['password']}, 
        })
    } catch (err) {
        res.status(500).json(err);
    }
});
<<<<<<< HEAD
=======

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: {exclude:['password']},
            where: {id: req.params.id},
            include: [
                {
                    model: Post,
                    attributes: ['id', 'place', 'description', 'created_on']
                },
                {
                    model: Image,
                    attributes: ['id', 'title', 'img'],
                    include: {
                        model: Post,
                        attributes: ['place']
                    }
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_on'],
                    include: {
                        model: Post,
                        attributes: ['place']
                    }
                }
            ]
        });
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this ID.'});
            return;
        }
    } catch(err) {
        res.status(500).json(err);
    }
}
);

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = dbUserData.username;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        })
    } catch(err) {
        res.status(500).json(err);
    }
}
);

router.post('/logIn', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });

        if(!dbUserData) {
            res.status(404).json({message: 'Username or password is not correct.'});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(404).json({message: 'Username or password is not correct.'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = dbUserData.username;
            req.session.user_id = dbUserData.id;
            res.status(200).json({user: dbUserData, message: 'You are logged in.'});
        }) 
    } catch(err) {
        res.status(500).json(err);
    }
});
>>>>>>> b682ce8597963378e7340607695b456c36212f9c

module.export = router;
