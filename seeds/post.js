const { Post } = require('../models');

const postData = [
    {
        place: "Milano Italy",
        description: "Visited Piazza D'Uomo",
        user_id: 1
    },
    {
        place: "Rome Italy!",
        description: "Visited Coloseu",
        user_id: 2
    },
    {
        place: "London England",
        description: "Visitied Stamford Bridge",
        user_id: 3

    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;