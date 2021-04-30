const { User } = require('../models');

const userData = [
  {
    username: 'braveheart',
    password: '123456',
  },
  {
    username: 'joe',
    password: 'joemon1',
  },
  {
    username: 'pete',
    password: 'password1',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
