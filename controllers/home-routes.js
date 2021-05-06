const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Render Homepage
router.get('/', async (req, res) => {
  try {
    // Query configuration
    // From the Post table, include the following
    const postData = await Post.findAll({
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
          // Order the posts from most recent to least
          order: [['created_at', 'DESC']],

          // From the User table, include the post creator's user name
          // From the Comment table, include all comments
          include: { model: User, attributes: ['username'] },
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    // Create an array for the posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass the posts into the homepage template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//SIGNUP
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

//POST
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'content', 'title', 'created_at'],
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
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          //   include: {
          //     model: User,
          //     attributes: ['username'],
          //   },
        },
      ],
    });

    // If no post by that id exists, return an error
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    // Serialize the post data
    const post = postData.get({ plain: true });

    //Past data into template
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Comments
// router.get('/posts-comments', async (req, res) => {
//   try {
//     const postComments = await Post.findOne({
//       where: {
//         id: req.params.id,
//       },

//       attributes: ['id', 'content', 'title', 'created_at'],

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
//           include: {
//             model: User,
//             attributes: ['username'],
//           },
//         },
//       ],
//     });
//     if (!postComments) {
//       res.status(404).json({ message: 'A post with this id does not exist' });
//       return;
//     }
//     const post = postComments.get({ plain: true });
//     res.render('post-comments', { post, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
