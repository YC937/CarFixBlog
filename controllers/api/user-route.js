const router = require('express').Router();

const { User, Post, Comment} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attribute: {exclude:['password']}, 
        })
    }
});

module.export = router;
