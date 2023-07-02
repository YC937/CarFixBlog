const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "No way!",
        user_id: 2,
        post_id: 1,
        
    },
    {
        comment_text: "Nice.",
        user_id: 3,
        post_id: 2,
        
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;