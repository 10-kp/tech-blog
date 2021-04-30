const { Post } = require('../models');

const postData = [
  {
    title: 'Pipe raises funding',
    post_content:
      'Pipe makes recurring revenue streams tradable for their annual value, meaning more cash flow for scaling companies. No discounts, no debt, no dilution..',
    user_id: 1,
  },
  {
    title: 'Investors hooked on Minnow',
    post_content:
      'Seattle-based startup Minnow, makers of a contactless food delivery and pickup pod, has raised $3 million in seed funding.',
    user_id: 2,
  },
  {
    title: 'SnackPass!',
    post_content:
      'Why wait in line when you can simply order your food on your phone and pick your order when you get to the restaurant?',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
