const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Image = require('../models/images');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Image, {
  foreignKey: 'user_id',
});

Post.hasMany(Image, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Image.belongsTo(Post, {
  foreignKey: 'post_id',
});

Image.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey:'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };