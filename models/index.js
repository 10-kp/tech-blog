const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment.belongsTo(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'cascade',
// });

// User.hasMany(Post, {
//   foreignKey: 'user_id',
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: 'cascade',
// });

module.exports = { User, Post, Comment };
