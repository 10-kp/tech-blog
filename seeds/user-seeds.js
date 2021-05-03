const { User } = require('../models');

const userData = [
  {
    username: 'John',
    password: 'password1',
  },
  {
    username: 'Jane',
    password: 'password1',
  },
  {
    username: 'Pete',
    password: 'password1',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
