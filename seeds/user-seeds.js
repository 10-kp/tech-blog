const { User } = require('../models');

const userData = [
  {
    username: 'John Doe',
    password: 'password1',
  },
  {
    username: 'Jane Doe',
    password: 'password1',
  },
  {
    username: 'Pete Man',
    password: 'password1',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
