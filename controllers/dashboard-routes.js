const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
// const { post } = require('./homeRoutes');

router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where: { user_id: req.params.user_id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: { model: User, attributes: ['username'] },
        },
        { model: User, attributes: ['username'] },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/id', withAuth, async (req, res) => {
  try {
    const postData = await await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    postData = postData.get({ plain: true });
    res.render('edit-post', {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  res.render('new-post');
});

// router.get('/create/', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       where: { user_id: req.session.user_id },
//       attributes: ['id', 'title', 'content', 'post_content'],
//       include: [
//         {
//           model: Comment,
//           attributes: [
//             'id',
//             'comment_text',
//             'post_id',
//             'user_id',
//             'created_at',
//           ],
//           include: { model: User, attributes: ['username'] },
//         },
//         { model: User, attributes: ['username'] },
//       ],
//     });
//     postData = postData.map((postDate) => postData.cget({ plain: true }));
//     res.render('create-post', {
//       ...post,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
